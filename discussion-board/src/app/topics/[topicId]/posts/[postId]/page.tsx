import { getComments } from "@/actions";
import { getPost } from "@/actions";
import CommentsList from "@/components/comments/CommentsList";
import NewComment from "@/components/comments/NewComment";
import { db } from "@/db/db";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";

export default async function PostPage(props: PostProps) {
  const [post, comments] = await Promise.all([
    getPost(props.params.postId),
    getComments(props.params.postId),
  ]);
  return (
    <Flex direction="column" alignItems="stretch" gap={3} padding={2}>
      <Card width="100%">
        <CardBody>
          <Heading fontSize="large" marginY={2}>
            {post.title}
          </Heading>
          <Text>{post.content}</Text>
        </CardBody>
        <CardFooter width="100%">
          <NewComment postId={post.id} />
        </CardFooter>
      </Card>
      <Text fontSize="large">
        {post.comments.length} comment{post.comments.length !== 1 && "s"}
      </Text>
      <CommentsList comments={comments} />
    </Flex>
  );
}

export async function generateStaticParams() {
  const posts = await db.post.findMany();

  return posts.map((post) => ({
    topicId: post.topicId,
    postId: post.id,
  }));
}
