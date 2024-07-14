"use client";

import { createPost } from "@/actions";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";

export default function NewPost({ topicId }: { topicId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, action, loading] = useFormState<PostFormMessage, FormData>(
    createPost,
    {}
  );
  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        New post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form action={action}>
              <FormControl isInvalid={Array.isArray(formState.title)}>
                <FormLabel>Title</FormLabel>
                <Input name="title" placeholder="Post title" />
                {Array.isArray(formState.title) &&
                  formState.title.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
              <FormControl isInvalid={Array.isArray(formState.content)}>
                <FormLabel>Content</FormLabel>
                <Textarea name="content" placeholder="Post content" />
                {Array.isArray(formState.content) &&
                  formState.content.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
              <Input hidden name="topic" value={topicId} readOnly />
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
                  Create
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
