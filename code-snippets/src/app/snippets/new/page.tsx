"use client";

import { createSnippet } from "@/actions/snippets";
import { useFormState } from "react-dom";

export default function CreateSnippet() {
  const [formState, action] = useFormState<FormState, FormData>(createSnippet, {
    message: "",
  });
  return (
    <div className="w-full flex flex-col p-5">
      <form action={action}>
        <div className="w-full flex flex-row items-center space-x-2 my-3">
          <span>Create Snippet</span>
        </div>
        <div className="w-full flex flex-row items-center space-x-2 my-3">
          <span className="w-10">Title</span>
          <input
            className="border-black border-2 flex-1 px-2 py-1"
            name="title"
          />
        </div>
        <div className="w-full flex flex-row items-start space-x-2 my-3">
          <span className="w-10">Code</span>
          <textarea
            className="border-black border-2 flex-1 px-2 py-1"
            name="code"
          />
        </div>
        <div className="w-full flex flex-row items-center space-x-2 my-3">
          <div>
            <input
              type="submit"
              className="px-3 py-1 border-black border-2"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
  // }
}
