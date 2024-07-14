import { getTopic } from "@/actions";
import { Divider, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import NewPost from "@/components/posts/NewPost";
import { getPosts } from "@/actions";
import PostsList from "@/components/posts/PostsList";
import { db } from "@/db/db";

export const revalidate = 30;

export default async function TopicPage({ params }: TopicProps) {
  const [posts, topic] = await Promise.all([
    getPosts(params.topicId),
    getTopic(params.topicId),
  ]);
  return (
    <SimpleGrid columns={4} gap={2} padding={4}>
      <GridItem colSpan={3}>
        <Flex direction="column" alignItems="start" gap={2}>
          <Text fontSize="xx-large">{topic.slug}</Text>
          <Divider />
          <PostsList posts={posts} />
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction="column" alignItems="stretch" gap={2}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="large">{topic.slug}</Text>
            <NewPost topicId={params.topicId} />
          </Flex>
          <Divider />
          <Text>{topic.description}</Text>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
}

export async function generateStaticParams() {
  const topics = await db.topic.findMany();

  return topics.map((topic) => ({ topicId: topic.id }));
}
