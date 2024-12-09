/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "braid",
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
    const isPermanentStage = $app.stage === "production" || $app.stage === "development";

    const vpc = isPermanentStage
      ? new sst.aws.Vpc(`VPC`, { bastion: true, nat: "ec2" })
      : sst.aws.Vpc.get(`VPC`, "vpc-0d9ca494252bc8b37");

    const database =
      isPermanentStage || $dev
        ? new sst.aws.Postgres(`Database`, {
            vpc,
            proxy: true,
            dev: {
              database: "braid",
              host: "localhost",
              port: 54326,
              username: "postgres",
              password: "postgres",
            },
          })
        : sst.aws.Postgres.get(`Database`, {
            id: `DevDatabaseInstance`,
            proxyId: `DevDatabaseProxy`,
          });

    const webApp = new sst.aws.TanstackStart(`Web`, {
      link: [database],
      vpc,
      dev: { command: "pnpm run dev:app" },
    });

    if ($app.stage === "production") {
      const databasePush = new sst.aws.Function(`DatabasePush`, {
        handler: "app/database/database-push.databasePush",
        link: [database],
        vpc,
      });

      new aws.lambda.Invocation(`DatabasePushInvocation`, {
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
      web: webApp.url,
    };
  },
});
