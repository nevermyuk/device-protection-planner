'use client';

import DeviceRegistrationForm from '@/app/components/dashboard/device/add-device';
import { Container, Heading, Box } from '@chakra-ui/react';

const Page = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Box textAlign="center">
        <Heading as="h1" mb={4}>
          Device Registration
        </Heading>
        <DeviceRegistrationForm />
      </Box>
    </Container>
  );
};

export default Page;
