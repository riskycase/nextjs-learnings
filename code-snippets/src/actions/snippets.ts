"use server";

import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllSnippets(): Promise<Snippet[]> {
  return db.snippet.findMany();
}

export async function createSnippet(
  state: FormState,
  data: FormData
): Promise<FormState> {
  const title = data.get("title")?.toString();
  const code = data.get("code")?.toString();

  if (typeof title !== "string") {
    return { message: "Title is underfined" };
  }

  if (typeof code !== "string") {
    return { message: "Code is underfined" };
  }

  const snippet = await db.snippet.create({
    data: {
      title: title!,
      code: code!,
    },
  });
  revalidatePath("/");
  revalidatePath(`/snippets/${snippet.id}`);
  redirect(`/snippets/${snippet.id}`);
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  revalidatePath(`/snippets/${id}`);
  redirect("/");
}
