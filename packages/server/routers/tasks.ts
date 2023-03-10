import { z } from "zod";

import { Color, Status } from "@prisma/client";
import { prisma } from "../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ZTask } from "../types";

export const taskRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getTasks: publicProcedure.query(async () => {
    return await prisma.task.findMany();
  }),
  addTask: publicProcedure
    .input(ZTask)
    .mutation(async ({ input: { status, shade, ...input } }) => {
      return await prisma.task.create({
        data: {
          ...input,
          status: status as Status,
          shade: shade as Color,
        },
      });
    }),
  editTask: publicProcedure
    .input(
      ZTask.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input: { shade, status, ...input } }) => {
      return await prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          status: status as Status,
          shade: shade as Color,
        },
      });
    }),
  deleteTask: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.task.delete({
      where: {
        id: input,
      },
    });
  }),
});
