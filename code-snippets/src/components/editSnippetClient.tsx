"use client";

import { editSnippet } from "@/actions/snippets";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

export default function EditSnippetClient({
  initialTitle,
  initialCode,
  id,
  edit,
}: {
  initialTitle: string;
  initialCode: string;
  id: number;
  edit: boolean;
}) {
  const [code, setCode] = useState(initialCode);

  const editSnippetAction = editSnippet.bind(null, id, code!);

  return (
    <form action={editSnippetAction}>
      <div className="w-full flex flex-col items-start space-y-2 my-3 justify-betweenx">
        <input
          className="text-lg border-black border-2 flex-1 px-2 py-1"
          name="title"
          value={initialTitle}
        />
        <Editor
          value={code}
          onChange={(code) => setCode(code!)}
          height="60vh"
          theme="vs-dark"
          className="p-1"
          options={{
            folding: false,
            readOnly: edit,
          }}
        />
      </div>
      <div className="w-full flex flex-row items-center space-x-2 my-3 justify-between">
        <div className="space-x-2">
          <input
            type="submit"
            className="px-3 py-1 border-black border-2 cursor-pointer"
            value="Save"
          />
        </div>
      </div>
    </form>
  );
}
