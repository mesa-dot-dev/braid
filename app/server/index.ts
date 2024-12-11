import { db } from "@/database/db";
import { ConfigTable, SlackInstallationTable } from "@/database/schema.sql";
import { getFeeds } from "@/feeds";
import { eq, getTableColumns } from "drizzle-orm";
import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler, CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { IService } from "@/lib/interfaces";

const t = initTRPC
  .context<CreateAWSLambdaContextOptions<APIGatewayProxyEvent | APIGatewayProxyEventV2>>()
  .create();

const router = t.router({
  ping: t.procedure.query(() => {
    return "pong";
  }),
  getFeedsAndConfigs: t.procedure.input(z.object({ teamId: z.string() })).query(async ({ input }) => {
    const teamConfigs = await db
      .select({ ...getTableColumns(ConfigTable), teamId: SlackInstallationTable.teamId })
      .from(ConfigTable)
      .innerJoin(SlackInstallationTable, eq(ConfigTable.installationId, SlackInstallationTable.id))
      .where(eq(SlackInstallationTable.teamId, input.teamId));
    const products = await getFeeds();
    const services = await products.reduce(
      async (acc, product) => {
        const services = await product.getServices();
        return {
          ...(await acc),
          [product.name]: services,
        };
      },
      Promise.resolve({} as Record<string, IService[]>),
    );
    const productsWithServices = products.map((product) => ({
      name: product.name,
      displayName: product.displayName,
      logo: product.logo,
      services: services[product.name],
    }));
    return { products: productsWithServices, teamConfigs };
  }),
});

export type Router = typeof router;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext: (opts) => opts,
});
