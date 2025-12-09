import {db} from "@/src/db";
import {agents} from "@/src/db/schema";
import {baseProcedure, createTRPCRouter, protectedProcedure} from "@/src/trpc/init";
import { agentsSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  // Change getOne to use protectedProcedure
  getOne: protectedProcedure
          .input(z.object({ id: z.string()}))
          .query(async ({ input }) => {
              const [existingAgent] = await db
              .select({
                ...getTableColumns(agents),
                // TODO: Change to actual count
                meetingCount: sql<number>`5`
              })
                .from(agents)
                .where(eq( agents.id, input.id))

    return existingAgent;
  }),
  // Change getMany to use protectedProcedure
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),
  create: protectedProcedure
          .input(agentsSchema)
          .mutation(async ({ input, ctx}) => {
            const [createdAgent] = await db
            .insert(agents)
            .values({
              ...input,
              userId: ctx.auth.user.id
            })
            .returning();

            return createdAgent
          })
});
