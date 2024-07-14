"use server";

import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { paths } from "@/util/pathHelpers";
import { commentSchema } from "@/zodSchemas/schemas";
import { auth } from "@/auth/auth";
import { cache } from "react";

export async function createComment(
  message: CommentFormMessage,
  formData: FormData
): Promise<CommentFormMessage> {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const parseResult = commentSchema.safeParse({
    content: formData.get("content"),
  });
  if (parseResult.success) {
    const [post, newComment] = await Promise.all([
      db.post.findFirstOrThrow({
        where: { id: formData.get("post")!.toString() },
      }),
      db.comment.create({
        data: {
          ...parseResult.data,
          userId: user!.user.id!,
          postId: formData.get("post")!.toString(),
        },
      }),
    ]);
    revalidatePath(paths.viewPost({ ...post, comments: [], topicName: "" }));
    redirect(paths.viewPost({ ...post, comments: [], topicName: "" }));
    return {};
  } else {
    return parseResult.error.flatten().fieldErrors;
  }
}

export async function createCommentReply(
  message: CommentFormMessage,
  formData: FormData
): Promise<CommentFormMessage> {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const parseResult = commentSchema.safeParse({
    content: formData.get("content"),
  });
  if (parseResult.success) {
    const [post, newComment] = await Promise.all([
      db.post.findFirstOrThrow({
        where: { id: formData.get("post")!.toString() },
      }),
      db.comment.create({
        data: {
          ...parseResult.data,
          userId: user!.user.id!,
          postId: formData.get("post")!.toString(),
          parentId: formData.get("parentId")!.toString(),
        },
      }),
    ]);
    revalidatePath(paths.viewPost({ ...post, comments: [], topicName: "" }));
    redirect(paths.viewPost({ ...post, comments: [], topicName: "" }));
    return {};
  } else {
    return parseResult.error.flatten().fieldErrors;
  }
}

export const getComments = cache(
  async (postId: string): Promise<CommentSchema[]> => {
    const [templateComments, users] = await Promise.all([
      db.comment.findMany({
        orderBy: { createdAt: "desc" },
      }),
      db.user.findMany(),
    ]);
    const comments = templateComments.map((comment): CommentSchema => {
      const user = users.find((user) => user.id === comment.userId)!!;
      return {
        ...comment,
        children: [],
        userName: user.name!!,
        userImage: user.image!!,
      };
    });
    comments.forEach((comment) => {
      if (comment.parentId) {
        const parentComment = comments.find(
          (parentComment) => parentComment.id === comment.parentId
        );
        parentComment?.children.push(comment);
        comment.parent = parentComment;
      }
    });
    return comments.filter((comment) => !comment.parent);
  }
);
