/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />
const name = "braid";
export default $config({
  app(input) {
    return {
      name: name,
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
          profile: process.env.GITHUB_ACTIONS
            ? undefined
            : input?.stage === "production"
              ? "mesa-production"
              : "mesa-development",
        },
      },
    };
  },
  async run() {
    const isPermanentStage = $app.stage === "production" || $app.stage === "dev";
    // const betterAuthSecret = new sst.Secret("BetterAuthSecret");

    const vpc = isPermanentStage
      ? new sst.aws.Vpc(`${name}-vpc`, { bastion: true, nat: "ec2" })
      : sst.aws.Vpc.get(`${name}-vpc`, "vpc-057d1174bade06382");

    const database =
      isPermanentStage || $dev
        ? new sst.aws.Postgres(`${name}-database`, {
            vpc,
            proxy: true,
            dev: {
              database: "braid",
              host: "localhost",
              port: 5432,
              username: "postgres",
              password: "postgres",
            },
          })
        : sst.aws.Postgres.get(`${name}-database`, {
            id: `${name}-dev-databaseinstance`,
            proxyId: `${name}-dev-databaseproxy`,
          });

    const webApp = new sst.aws.TanstackStart(`${name}-app`, {
      link: [database],
      vpc,
      dev: { command: "pnpm run dev:app" },
    });

    if ($app.stage === "production") {
      const databasePush = new sst.aws.Function(`${name}-database-push`, {
        handler: "app/database/database-push.databasePush",
        link: [database],
        vpc,
      });

      new aws.lambda.Invocation(`${name}-database-push-invocation`, {
        functionName: databasePush.name,
        input: JSON.stringify({
          now: new Date().toISOString(),
        }),
      });
    }

    new sst.x.DevCommand("Studio", {
      link: [database],
      dev: {
        command: "pnpm db:studio",
        autostart: true,
      },
    });

    new sst.x.DevCommand("Compose", {
      dev: {
        command: "docker compose up",
        autostart: true,
      },
    });

    return {
      webApp: webApp.url,
    };
  },
});
