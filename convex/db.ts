import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveImage = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image }) => {
    const input = await ctx.db.insert("db", {
      prompt,
    });
    await ctx.scheduler.runAfter(0, internal.generate.generate, {
      id: input,
      prompt,
      image,
    });
    return input;
  },
});
