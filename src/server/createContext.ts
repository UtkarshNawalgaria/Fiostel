import * as trpc from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next'
import prisma from "../utils/prisma";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {

  async function getUserFromHeader() {
    if (opts?.req.headers.authorization) {
      return {
        id: 1,
        name: "Utkarsh"
      }
    }
    return null
  }

  const user = await getUserFromHeader()

  return {
    req: opts?.req,
    res: opts?.res,
    user: user,
    prisma: prisma
  }

}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
