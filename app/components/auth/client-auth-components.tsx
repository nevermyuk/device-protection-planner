'use client';

import { Button } from '@chakra-ui/react';
import { signIn, signOut } from 'next-auth/react';

export function SignIn() {
  return (
    <Button colorScheme="teal" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}

export function SignOut() {
  return (
    <Button colorScheme="red" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
