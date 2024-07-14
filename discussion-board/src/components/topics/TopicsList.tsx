import { paths } from "@/util/pathHelpers";
import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function TopicsList({ topics }: { topics: TopicSchema[] }) {
  if (topics.length === 0) {
    return <Text fontSize="large">There is no data to display here!</Text>;
  } else {
    return (
      <Flex direction="column" alignItems="stretch" gap={2}>
        {topics.map((topic) => (
          <Link as={NextLink} href={paths.topicPath(topic)} key={topic.id}>
            <Text>{topic.slug}</Text>
          </Link>
        ))}
      </Flex>
    );
  }
}
