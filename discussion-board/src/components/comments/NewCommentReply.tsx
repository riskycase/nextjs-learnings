"use client";

import { createCommentReply } from "@/actions";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export default function NewCommentReply({
  comment,
}: {
  comment: CommentSchema;
}) {
  const [visible, setVisible] = useState(false);
  const [formState, action, loading] = useFormState<
    CommentFormMessage,
    FormData
  >(createCommentReply, {});
  return (
    <Box width="100%">
      <Text onClick={() => setVisible(!visible)}>
        Reply <Icon as={visible ? MdArrowDropUp : MdArrowDropDown} />
      </Text>
      {visible && (
        <form action={action}>
          <FormControl isInvalid={Array.isArray(formState.content)}>
            <FormLabel>Content</FormLabel>
            <Textarea name="content" placeholder="New reply" />
            {Array.isArray(formState.content) &&
              formState.content.map((error, index) => (
                <FormErrorMessage key={index}>{error}</FormErrorMessage>
              ))}
          </FormControl>
          <Input hidden name="post" value={comment.postId} readOnly />
          <Input hidden name="parentId" value={comment.id} readOnly />
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
      )}
    </Box>
  );
}
