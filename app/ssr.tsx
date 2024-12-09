/// <reference types="vinxi/types/server" />
import { createStartHandler, defaultStreamHandler } from "@tanstack/start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";
import { createClerkHandler } from "@clerk/tanstack-start/server";
import { Resource } from "sst";

import { createRouter } from "./router";

export default createClerkHandler(
  createStartHandler({
    createRouter,
    getRouterManifest,
  }),
  {
    // secretKey: Resource.ClerkSecretKey.value,
    // publishableKey: Resource.Config.VITE_CLERK_PUBLISHABLE_KEY,
    signInUrl: "/signin",
    signUpUrl: "/signup",
  },
)(defaultStreamHandler);
