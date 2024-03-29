import { authRouter } from "./routers/auth";
import { notesRouter } from "./routers/notes";
import { taskRouter } from "./routers/tasks";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  auth: authRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
