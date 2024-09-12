import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Stack,
  ListItem,
  List,
} from '@chakra-ui/react';
interface PhoneCardProps {
  imageUrl: string;
  device_name: string;
  purchase_date: string;
  model_name: string;
  warranty_period: string;
  additional_info: string;
  plan_type_name: string;
  coverage_details: string;
  expiration_date: string;
}

interface Recommendations {
  recommendation: string;
  maintenance_tips: string[];
}

const PhoneCard: React.FC<PhoneCardProps> = ({
  imageUrl,
  device_name,
  purchase_date,
  model_name,
  warranty_period,
  additional_info,
  plan_type_name,
  coverage_details,
  expiration_date,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch('/api/device/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_name,
          purchase_date,
          warranty_period,
          additional_info,
        }),
      });
      if (!res.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        const errorData = await res.json();
        setError(errorData.error || 'Something went wrong.');
        return;
      }

      const data: Recommendations = await res.json();
      setRecommendations(data);
      console.log(data.maintenance_tips);
    } catch (error) {
      setError(
        'Oops! There was an issue fetching recommendations. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };
  // Fetch recommendations when modal opens
  const handleOpen = () => {
    onOpen();
    fetchRecommendations();
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleOpen}
      cursor="pointer"
    >
      <Image src={imageUrl} alt={device_name} />
      <Box p="6">
        <Text fontWeight="bold" fontSize="lg">
          {device_name}
        </Text>
        <Text>{model_name}</Text>
        <Text>
          <strong>Purchase Date:</strong> {purchase_date}
        </Text>
        <Text>
          <strong>Expiration Date:</strong> {expiration_date}
        </Text>
      </Box>

      {/* Modal Triggered on Click */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{device_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <strong>Model:</strong> {model_name}
            </Text>
            <Text>
              <strong>Purchase Date:</strong> {purchase_date}
            </Text>
            <Text>
              <strong>Warranty Period:</strong> {warranty_period}
            </Text>
            <Text>
              <strong>Additional Info:</strong> {additional_info}
            </Text>
            <Text>
              <strong>Plan Type:</strong> {plan_type_name}
            </Text>
            <Text>
              <strong>Coverage Details:</strong> {coverage_details}
            </Text>
            <Text>
              <strong>Expiration Date:</strong> {expiration_date}
            </Text>

            {loading ? (
              <Box
                mt={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Spinner />
                <Text mt={2}>Thinking about recommendations and tips...</Text>
              </Box>
            ) : error ? (
              <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" bg="red.50">
                <Text fontWeight="bold" color="red.600">
                  Error:
                </Text>
                <Text>{error}</Text>
              </Box>
            ) : recommendations ? (
              <Box
                mt={4}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg="gray.50"
              >
                <Stack spacing={4}>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      Upgrade Recommendation:
                    </Text>
                    <Text>{recommendations?.recommendation}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      Maintenance Tips:
                    </Text>
                    <List spacing={2}>
                      {recommendations.maintenance_tips.map((tip, index) => (
                        <ListItem key={index}>
                          <Text>{tip}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Stack>
              </Box>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PhoneCard;
