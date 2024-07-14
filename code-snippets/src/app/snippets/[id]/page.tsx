import { notFound } from "next/navigation";
import { db } from "@/db/db";
import Link from "next/link";
import { deleteSnippet } from "@/actions/snippets";

export default async function ViewSnippet({ params }: PageProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: Number(params.id) },
  });
  if (snippet == null) {
    notFound();
  } else
    return (
      <div className="w-full flex flex-col p-5">
        <div className="w-full flex flex-col items-start space-y-2 my-3 justify-betweenx">
          <span className="text-lg">{snippet.title}</span>
          <textarea
            disabled
            className="font-mono border-2 border-slate-700 p-2 bg-slate-300 w-full h-full"
            value={snippet.code}
          />
        </div>
        <div className="w-full flex flex-row items-center space-x-2 my-3 justify-between">
          <form action={deleteSnippet.bind(null, Number(params.id))}>
            <div className="space-x-2">
              <Link href={`/snippets/${snippet.id}/edit`}>
                <button className="px-3 py-1 border-black border-2">
                  Edit
                </button>
              </Link>
              <input
                type="submit"
                className="px-3 py-1 border-black border-2 cursor-pointer"
                value="Delete"
              />
            </div>
          </form>
        </div>
      </div>
    );
}
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => ({ id: snippet.id.toString() }));
}
