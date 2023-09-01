import * as trpc from '@trpc/server'
import { z } from 'zod'
import { Context } from '../createContext'
import superjson from 'superjson'

function createRouter() {
  return trpc.router<Context>().transformer(superjson)
}

const bookingRouter = createRouter().query('get_available_dates', {
  input: z.object({
    id: z.number(),
  }),
  resolve({ input, ctx }) {
    const { prisma } = ctx
    return { message: 'Hello' }
  },
})

export const appRouter = createRouter().merge('booking.', bookingRouter)

export type AppRouter = typeof appRouter
