import { paths } from "@/util/pathHelpers";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Link,
  CardFooter,
  Tag,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function PostsList({ posts }: { posts: PostSchema[] }) {
  if (posts.length === 0) {
    return <Text fontSize="large">There is no data to display here!</Text>;
  } else {
    return (
      <Flex direction="column" alignItems="stretch" gap={2} width="100%">
        {posts.map((post) => (
          <Link as={NextLink} key={post.id} href={paths.viewPost(post)}>
            <Card>
              <CardBody>
                <Heading fontSize="large" marginY={2}>
                  {post.title}
                </Heading>
                <Text noOfLines={2}>{post.content}</Text>
              </CardBody>
              <CardFooter>
                <Flex alignItems="center" gap={2}>
                  <Text>
                    {post.comments.length} comment
                    {post.comments.length !== 1 && "s"}
                  </Text>
                  <Tag>{post.topicName}</Tag>
                </Flex>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </Flex>
    );
  }
}
