// app/page.tsx

'use client';

import { Container, Heading, Box } from '@chakra-ui/react';
import DeviceRegistrationForm from '../components/ui/dashboard/device/add-device';

const Page = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Box textAlign="center">
        <Heading as="h1" mb={4}>
          Page Title
        </Heading>
        <DeviceRegistrationForm />
      </Box>
    </Container>
  );
};

export default Page;
