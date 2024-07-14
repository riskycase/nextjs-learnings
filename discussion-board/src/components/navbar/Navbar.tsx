import React, { Suspense } from "react";
import { Box, Flex, Link, theme } from "@chakra-ui/react";
import NextLink from "next/link";
import Login from "./Login";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="w-full">
      <Box
        width="100%"
        padding={4}
        backgroundColor={theme.colors.gray[700]}
        color={theme.colors.gray[50]}
      >
        <Flex
          w="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link as={NextLink} href="/">
            Discuss
          </Link>
          <Flex direction="row" alignItems="center">
            <Suspense>
              <Search />
            </Suspense>
            <Login />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
