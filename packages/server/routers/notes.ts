import { z } from "zod";

import { Color, Status } from "@prisma/client";
import { prisma } from "../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ZNote } from "../types";

export const notesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getNotes: publicProcedure.query(async ({ input }) => {
    type TFindManyTasks = Parameters<typeof prisma.task.findMany>[0];
    let options: TFindManyTasks = {
      orderBy: {
        startTime: "asc",
      },
    };

    return await prisma.task.findMany(options);
  }),
  addNote: publicProcedure
    .input(ZNote)
    .mutation(async ({ input: { shade, ...input } }) => {
      return await prisma.task.create({
        data: {
          ...input,
          status: "TODO" as Status, // --
          endTime: new Date(), // --
          startTime: new Date(), // --
          shade: shade as Color,
        },
      });
    }),
  editTask: publicProcedure
    .input(
      ZNote.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input: { shade, ...input } }) => {
      return await prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
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
