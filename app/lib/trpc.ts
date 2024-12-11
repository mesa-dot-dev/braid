import { Resource } from "sst";
import type { Router } from "../server";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

export const trpc = createTRPCReact<Router>();

export const api = trpc.createClient({
  links: [
    httpBatchLink({
      url: Resource.Trpc.url,
    }),
  ],
});
