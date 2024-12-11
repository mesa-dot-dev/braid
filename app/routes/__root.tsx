import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import appCss from "@/app.css?url";
import { ClerkProvider } from "@clerk/tanstack-start";
import { getAuth } from "@clerk/tanstack-start/server";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { UserTable } from "@/database/schema.sql";
import { trpc, api } from "@/lib/trpc";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  // const [user] = userId ? await db.select().from(UserTable).where(eq(UserTable.id, userId!)) : [];

  return { userId };
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "braid",
    },
  ],
  component: RootComponent,
  beforeLoad: async () => await getUser(),
  loader: ({ context }) => ({ queryClient: context.queryClient }),
  links: () => [{ rel: "stylesheet", href: appCss }],
});

function RootComponent() {
  const { queryClient } = Route.useLoaderData();
  return (
    <trpc.Provider client={api} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider>
          <html>
            <head>
              <Meta />
            </head>
            <body>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
            </body>
          </html>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
