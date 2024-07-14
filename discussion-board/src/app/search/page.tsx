import NewTopic from "@/components/topics/NewTopic";
import PostsList from "@/components/posts/PostsList";
import { Divider, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { getPostsBySearch, getTopics } from "@/actions";
import TopicsList from "@/components/topics/TopicsList";

export const revalidate = 10;

export default async function Search(props: SearchProps) {
  const [posts, topics] = await Promise.all([
    getPostsBySearch(props.searchParams.search),
    getTopics(),
  ]);
  return (
    <SimpleGrid columns={4} gap={2} padding={4}>
      <GridItem colSpan={3}>
        <Flex direction="column" alignItems="start" gap={2}>
          <Text fontSize="xx-large">Top posts</Text>
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
            <Text fontSize="x-large">Topics</Text>
            <NewTopic />
          </Flex>
          <Divider />
          <TopicsList topics={topics} />
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
}
