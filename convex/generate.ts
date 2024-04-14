"use node";

import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import Replicate from "replicate";

export const generate = internalAction({
  args: { id: v.id("db"), prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image, id }) => {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        "Add REPLICATE_API_TOKEN to your environment variables: " +
          "https://docs.convex.dev/production/environment-variables"
      );
    }
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = (await replicate.run(
        "yorickvp/llava-13b:a0fdc44e4f2e1f20f2bb4e27846899953ac8e66c5886c5878fa1d6b73ce009e5",
      {
        input: {
            image: "https://replicate.delivery/pbxt/KRULC43USWlEx4ZNkXltJqvYaHpEx2uJ4IyUQPRPwYb8SzPf/view.jpg",
            top_p: 1,
            prompt: "Are you allowed to swim here?",
            max_tokens: 1024,
            temperature: 0.2
          },
      }
    )) as [string, string];

    // await ctx.runMutation(internal.db.updateSketchResult, {
    //   sketchId,
    //   result: output[1],
    // });
  },
});