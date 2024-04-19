// import { Id } from "convex/dist/cjs-types/values/value";
import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import { GenericId, v } from "convex/values";

var currentID: GenericId<string>;

export const saveImage = mutation({
  args: { prompt: v.string(), image: v.id("_storage") },
  handler: async (ctx, { prompt, image }) => {
    let url  = await ctx.storage.getUrl(image)
    console.log(url)
    if (url==null){
      url = ""
    }
    const input = await ctx.db.insert("db", {
      prompt,
      image
    });
    await ctx.scheduler.runAfter(0, internal.generate.generate, {
      id: input,
      prompt,
      url,
    });
    currentID = input;
    console.log(getResponse);
    return input;
  },
});

export const getResponse = query({
  handler: (ctx) => {
    if (!currentID) return null;
    return ctx.db.get(currentID);
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

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
