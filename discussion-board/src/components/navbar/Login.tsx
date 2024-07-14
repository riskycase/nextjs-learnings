"use client";

import { signIn, signOut } from "@/actions";
import { signOut as nextSignOut, useSession } from "next-auth/react";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  theme,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Login() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  if (session.status === "loading") {
    return <Spinner />;
  } else if (session.status === "unauthenticated") {
    return (
      <Button
        isLoading={loading}
        onClick={() => {
          setLoading(true);
          signIn();
        }}
      >
        Sign in
      </Button>
    );
  } else if (session.status === "authenticated" && session.data.user) {
    return (
      <Flex direction="row" alignItems="center">
        <Menu>
          <MenuButton
            as={Avatar}
            name={session.data.user.name!}
            src={session.data.user.image!}
            size="sm"
          />
          <MenuList textColor={theme.colors.gray[700]}>
            <MenuItem
              onClick={() => {
                signOut();
                nextSignOut({ redirect: false });
              }}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }
}
