"use server";

import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { paths } from "@/util/pathHelpers";
import { auth } from "@/auth/auth";
import { postSchema } from "@/zodSchemas/schemas";
import { cache } from "react";

export async function createPost(
  message: PostFormMessage,
  formData: FormData
): Promise<PostFormMessage> {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const parseResult = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (parseResult.success) {
    const [topic, newPost] = await Promise.all([
      db.topic.findFirstOrThrow({
        where: { id: formData.get("topic")!.toString() },
      }),
      db.post.create({
        data: {
          ...parseResult.data,
          userId: user!.user.id!,
          topicId: formData.get("topic")!.toString(),
        },
      }),
    ]);
    revalidatePath(paths.homePath());
    redirect(
      paths.viewPost({ ...newPost, comments: [], topicName: topic.slug })
    );
  } else {
    return parseResult.error.flatten().fieldErrors;
  }
}

export const getPosts = cache(async (topic?: string): Promise<PostSchema[]> => {
  const [comments, posts, topics] = await Promise.all([
    db.comment.findMany(),
    db.post.findMany(),
    db.topic.findMany(),
  ]);
  return posts
    .map((post) => ({
      ...post,
      comments: comments.filter((comment) => comment.postId === post.id),
      topicName: topics.find((topic) => topic.id === post.topicId)!.slug,
    }))
    .filter((post) => (topic ? post.topicId === topic : true));
});

export const getPostsBySearch = cache(
  async (search: string): Promise<PostSchema[]> => {
    const [comments, posts, topics] = await Promise.all([
      db.comment.findMany(),
      db.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              content: {
                contains: search,
              },
            },
          ],
        },
      }),
      db.topic.findMany(),
    ]);
    return posts.map((post) => ({
      ...post,
      comments: comments.filter((comment) => comment.postId === post.id),
      topicName: topics.find((topic) => topic.id === post.topicId)!.slug,
    }));
  }
);

export const getPost = cache(async (postId: string): Promise<PostSchema> => {
  const [comments, post, topics] = await Promise.all([
    db.comment.findMany(),
    db.post.findFirstOrThrow({ where: { id: postId } }),
    db.topic.findMany(),
  ]);
  return {
    ...post,
    comments: comments.filter((comment) => comment.postId === post.id),
    topicName: topics.find((topic) => topic.id === post.topicId)!.slug,
  };
});
