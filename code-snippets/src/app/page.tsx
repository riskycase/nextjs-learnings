import { getAllSnippets } from "@/actions/snippets";
import Link from "next/link";

export default async function Home() {
  const snippets = await getAllSnippets();
  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex flex-col items-stretch space-x-2 my-3 justify-between">
        <span className="p-2">Snippets</span>
        <div className="flex flex-col space-y-1 my-2">
          {snippets.map((snippet) => (
            <Link href={`/snippets/${snippet.id}`} key={snippet.id}>
              <div className="bg-slate-400 border-2 border-slate-600 p-2">
                <span>{snippet.title}</span>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <Link href="/snippets/new">
            <button className="px-3 py-1 border-black border-2">Create</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
