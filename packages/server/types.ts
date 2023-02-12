import { z } from "zod";

export const ZTask = z.object({
  title: z.string(),
  description: z.string().nullable(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.string(),
  shade: z.string(),
  labels: z.string(),
  userId: z.string(),
});
