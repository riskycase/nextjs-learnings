"use server";

import { signIn as authSignIn, signOut as authSignOut } from "@/auth/auth";

export async function signIn() {
  return authSignIn("github");
}

export async function signOut() {
  return authSignOut();
}
