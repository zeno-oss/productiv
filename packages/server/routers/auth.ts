import { z } from "zod";

import { prisma } from "../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getUserFromId: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findFirstOrThrow({
      where: {
        id: input,
      },
    });
  }),
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findFirstOrThrow({
      where: {
        email: input,
      },
    });
  }),
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        locale: z.string(),
        profileImage: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      });

      if (user) {
        return user;
      }

      return await prisma.user.create({
        data: input,
      });
    }),
});
