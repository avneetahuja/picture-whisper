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

export const getResponse = query({
  args: { resId: v.id("db") },
  handler: (ctx, { resId }) => {
    if (!resId) return null;
    return ctx.db.get(resId);
  },
});

export const updateResponse = internalMutation({
  args: { id: v.id("db"), result: v.string() },
  handler: async (ctx, { id, result }) => {
    await ctx.db.patch(id, {
      result,
    });
  },
});
