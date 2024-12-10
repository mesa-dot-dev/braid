import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest, deleteCookie } from "vinxi/http";

const signout = createServerFn({ method: "POST" }).handler(async () => {
  const { headers } = getWebRequest();

  // await auth.api.signOut({ headers });

  deleteCookie("better-auth.session_token", { path: "/" });

  throw redirect({ to: "/sign-in/$" });
});

export const Route = createFileRoute("/signout")({
  preload: false,
  loader: () => signout(),
});
