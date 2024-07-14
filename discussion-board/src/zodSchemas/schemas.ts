import { z } from "zod";

export const topicSchema = z.object({
  slug: z.string().min(3, "Title must be at least 3 characters long!"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long!"),
});

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long!"),
  content: z
    .string()
    .min(10, "Description must be at least 10 characters long!"),
});

export const commentSchema = z.object({
  content: z.string().min(10, "Comment must be at least 10 characters long!"),
});
