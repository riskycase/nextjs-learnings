"use client";

import { createComment } from "@/actions";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";

export default function NewComment({ postId }: { postId: string }) {
  const [formState, action, loading] = useFormState<
    CommentFormMessage,
    FormData
  >(createComment, {});
  return (
    <Box width="100%">
      <form action={action}>
        <FormControl isInvalid={Array.isArray(formState.content)}>
          <FormLabel>Content</FormLabel>
          <Textarea name="content" placeholder="New comment" />
          {Array.isArray(formState.content) &&
            formState.content.map((error, index) => (
              <FormErrorMessage key={index}>{error}</FormErrorMessage>
            ))}
        </FormControl>
        <Input hidden name="post" value={postId} readOnly />
        <Flex
          width="100%"
          direction="column"
          alignItems="flex-end"
          gap={4}
          marginY={4}
        >
          {formState._form && (
            <Alert status="error">
              <AlertIcon />
              {formState._form}
            </Alert>
          )}
          <Button type="submit" colorScheme="green" isLoading={loading}>
            Post
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
