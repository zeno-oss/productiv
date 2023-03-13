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
    const { userId }: any = input;
    return await prisma.note.findMany({
      where: {
        userId,
      },
    });
  }),
  addNote: publicProcedure
    .input(ZNote)
    .mutation(async ({ input: { shade, ...input } }) => {
      return await prisma.note.create({
        data: {
          ...input,
          shade: shade as Color,
        },
      });
    }),
  editNote: publicProcedure
    .input(
      ZNote.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input: { shade, ...input } }) => {
      return await prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          shade: shade as Color,
        },
      });
    }),

  deleteNote: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.note.delete({
      where: {
        id: input,
      },
    });
  }),
});
