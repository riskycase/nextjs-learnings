import { notFound, redirect } from "next/navigation";
import { db } from "@/db/db";
import EditSnippetClient from "@/components/editSnippetClient";

export default async function EditSnippet({ params }: PageProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: Number(params.id) },
  });
  if (snippet == null) {
    notFound();
  } else
    return (
      <div className="w-full flex flex-col p-5">
        <EditSnippetClient
          initialTitle={snippet.title}
          initialCode={snippet.code}
          id={snippet.id}
          edit={true}
        />
      </div>
    );
}
