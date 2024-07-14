interface FormMessage {
  _form?: string;
  _formError?: "UNAUTHENTICATED" | "DBERROR";
}

interface TopicProps {
  params: { topicId: string };
}

interface PostProps extends TopicProps {
  params: { postId: string };
}

interface SearchProps {
  searchParams: { search: string };
}

interface CommentDetails {
  content: string;
  postId: string;
  userId: string;
  parentId: string?;
}

interface CommentSchema extends CommentDetails {
  id: string;
  parent?: CommentSchema;
  children: CommentSchema[];
  userName: string;
  userImage: string;
}

interface CommentFormMessage extends FormMessage {
  content?: string[] | undefined;
}

interface PostDetails {
  title: string;
  content: string;
  userId: string;
  topicId: string;
}

interface PostSchema extends PostDetails {
  id: string;
  topicName: string;
  comments: CommentDetails[];
}

interface PostFormMessage extends FormMessage {
  title?: string[] | undefined;
  content?: string[] | undefined;
}

interface TopicDetails {
  slug: string;
  description: string;
}

interface TopicSchema extends TopicDetails {
  id: string;
  posts: PostDetails[];
}

interface TopicFormMessage extends FormMessage {
  slug?: string[] | undefined;
  description?: string[] | undefined;
}
