interface NewSnippet {
  title: string;
  code: string;
}

interface Snippet extends NewSnippet {
  id: number;
}

interface PageProps {
  params: { id: string };
}

interface FormState {
  message: string;
}
