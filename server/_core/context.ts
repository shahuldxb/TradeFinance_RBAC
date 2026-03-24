import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../types";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  const now = new Date();
  const user: User = {
    id: 0,
    openId: "local",
    name: "Local User",
    email: null,
    loginMethod: "local",
    role: "admin",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
