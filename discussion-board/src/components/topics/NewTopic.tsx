"use client";

import { createTopic } from "@/actions";
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

export default function NewTopic() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, action, loading] = useFormState<TopicFormMessage, FormData>(
    createTopic,
    {}
  );
  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        New topic
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form action={action}>
              <FormControl isInvalid={Array.isArray(formState.slug)}>
                <FormLabel>Title</FormLabel>
                <Input name="slug" placeholder="Topic title" />
                {Array.isArray(formState.slug) &&
                  formState.slug.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
              <FormControl isInvalid={Array.isArray(formState.description)}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" placeholder="Topic description" />
                {Array.isArray(formState.description) &&
                  formState.description.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
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
