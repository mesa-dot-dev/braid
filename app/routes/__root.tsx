import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import appCss from "@/app.css?url";
import { ClerkProvider } from "@clerk/tanstack-start";
import { getAuth } from "@clerk/tanstack-start/server";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

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
  links: () => [{ rel: "stylesheet", href: appCss }],
});

function RootComponent() {
  return (
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
  );
}
