"use server";

import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { paths } from "@/util/pathHelpers";
import { topicSchema } from "@/zodSchemas/schemas";
import { auth } from "@/auth/auth";

export async function createTopic(
  message: TopicFormMessage,
  formData: FormData
): Promise<TopicFormMessage> {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const parseResult = topicSchema.safeParse({
    slug: formData.get("slug"),
    description: formData.get("description"),
  });
  if (parseResult.success) {
    const newTopic = await db.topic.create({
      data: parseResult.data,
    });
    revalidatePath(paths.homePath());
    redirect(paths.topicPath({ ...newTopic, posts: [] }));
  } else {
    return parseResult.error.flatten().fieldErrors;
  }
}

export async function getTopics(): Promise<TopicSchema[]> {
  const [posts, topics] = await Promise.all([
    db.post.findMany(),
    db.topic.findMany(),
  ]);
  return topics.map((topic) => ({ ...topic, posts: posts }));
}

export async function getTopic(id: string): Promise<TopicSchema> {
  const [posts, topic] = await Promise.all([
    db.post.findMany({
      where: { topicId: id },
    }),
    db.topic.findFirstOrThrow({
      where: { id },
    }),
  ]);
  return { ...topic, posts };
}
