'use client';
import React from 'react';
import Link from 'next/link'; // Import Link from next/link

import {
  chakra,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import { useSession } from 'next-auth/react';

import { FiHome, FiBell, FiMail, FiSettings } from 'react-icons/fi';
import { SignIn } from '../auth/client-auth-components';

const navItems = [
  { name: 'Dashboard', icon: FiHome, link: '/dashboard' },
  { name: 'Notifications', icon: FiBell, link: '/dashboard' },
  { name: 'Messages', icon: FiMail, link: '/dashboard' },
  { name: 'Settings', icon: FiSettings, link: '/dashboard' },
];

export default function App() {
  const { data: session } = useSession();
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
              {navItems.map((item) => (
                <Link href={item.link} passHref key={item.name}>
                  <Button
                    variant="ghost"
                    leftIcon={<item.icon />}
                    size="sm"
                    mb={2} // Margin-bottom for spacing between buttons
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? 'none' : 'flex'}
            alignItems="center"
          >
            <Button colorScheme="brand" leftIcon={<BsPlus />}>
              New Wallet
            </Button>

            <chakra.a
              p={3}
              color="gray.800"
              _dark={{ color: 'inherit' }}
              rounded="sm"
              _hover={{ color: 'gray.800', _dark: { color: 'gray.600' } }}
            >
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>
            {!session?.user ? <SignIn /> : <span>{session.user.name}</span>}
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
