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
  getTasks: publicProcedure
    .input(z.enum(["UPCOMING", "TODAY", "DONE", "ALL"]))
    .query(async ({ input }) => {
      type TFindManyTasks = Parameters<typeof prisma.task.findMany>[0];
      let options: TFindManyTasks = {
        orderBy: {
          startTime: "asc",
        },
      };
      switch (input) {
        case "ALL":
          options = {
            ...options,
          };
          break;
        case "UPCOMING":
          options = {
            ...options,
            where: {
              startTime: {
                gt: new Date(new Date().setHours(23, 59, 59, 999)),
              },
              status: {
                not: "DONE",
              },
            },
          };
          break;
        case "TODAY":
          options = {
            ...options,
            where: {
              startTime: {
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
              },
              status: {
                not: "DONE",
              },
            },
          };
          break;
        case "DONE":
          options = {
            ...options,
            where: {
              status: "DONE",
            },
          };
          break;
      }
      return await prisma.task.findMany(options);
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
  completeTask: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.task.update({
        where: {
          id: input,
        },
        data: {
          status: "DONE",
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
