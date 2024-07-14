import {
  Flex,
  Text,
  Avatar,
  Box,
  Divider,
} from "@chakra-ui/react";
import NewCommentReply from "./NewCommentReply";

export default function CommentsList({
  comments,
}: {
  comments: CommentSchema[];
}) {
  if (comments.length === 0) {
    return <Text fontSize="large">There is no data to display here!</Text>;
  } else {
    return (
      <Flex direction="column" alignItems="stretch" gap={5} width="100%">
        {comments.map((comment) => (
          <Flex
            direction="column"
            alignItems="stretch"
            key={comment.id}
            width="100%"
          >
            <Flex alignItems="start" gap={3}>
              <Avatar
                size="lg"
                name={comment.userName}
                src={comment.userImage}
              />
              <Box flex={1}>
                <Text fontWeight="bold">{comment.userName}</Text>
                <Text>{comment.content}</Text>
                <NewCommentReply comment={comment} />
                {comment.children.length > 0 && (
                  <Flex marginY={3}>
                    <Divider orientation="vertical" />
                    <CommentsList comments={comment.children} />
                  </Flex>
                )}
              </Box>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }
}
