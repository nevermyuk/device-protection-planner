'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import PhoneCard from '../components/dashboard/device/phone-card';
import Link from 'next/link';

interface Device {
  device_id: string;
  device_name: string;
  purchase_date: string;
  device_model_id: string;
  device_model_name: string;
  warranty_period: string;
  additional_info: string;
  plan_type_id: string;
  plan_type_name: string;
  coverage_details: string;
  expiration_date: string;
}

interface DashboardData {
  devices: Device[];
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/device?userId=${session.userId}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Unknown error');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.userId]);

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Container maxW="container.xl" p={4}>
      <Flex mb={4} align="center" justify="space-between">
        <Heading>Device Dashboard</Heading>
        {!session?.user ? (
          <Heading as="h2" size="lg" mb={4}>
            Please sign in to get started
          </Heading>
        ) : (
          <Link href="/dashboard/device/register" passHref>
            <Button colorScheme="teal" ml={4}>
              Add New Device
            </Button>
          </Link>
        )}
      </Flex>
      <Box mb={6}>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {data?.map((device) => (
            <PhoneCard
              key={device.device_id}
              imageUrl="https://imageio.forbes.com/specials-images/imageserve/66bcc543070b6a7e21f0fc74/US-TECH-APPLE-IPHONE/960x0.jpg?height=473&width=711&fit=bounds" // Replace with actual image URL if available
              device_name={device.device_name}
              purchase_date={device.purchase_date}
              model_name={device.device_model_name}
              warranty_period={device.warranty_period}
              additional_info={device.additional_info}
              plan_type_name={device.plan_type_name}
              coverage_details={device.coverage_details}
              expiration_date={device.expiration_date}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Dashboard;
