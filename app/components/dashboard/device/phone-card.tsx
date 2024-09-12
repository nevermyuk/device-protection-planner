import React from 'react';
import { Box, Flex, chakra, useColorModeValue } from '@chakra-ui/react';

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

const PhoneCard: React.FC<PhoneCardProps> = ({
  imageUrl,
  device_name,
  purchase_date,
  model_name, // Updated from device_model_id to model_name
  warranty_period,
  additional_info,
  plan_type_name, // Updated from plan_type_id to plan_type_name
  coverage_details,
  expiration_date,
}) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      maxW="md"
      mx="auto"
      direction="row"
      m={4}
    >
      <Box
        w={1 / 3}
        bgSize="cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></Box>

      <Box w={2 / 3} p={4}>
        <chakra.h1
          fontSize="2xl"
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'white')}
        >
          {device_name}
        </chakra.h1>

        <chakra.p
          mt={2}
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Purchase Date:</strong>{' '}
          {new Date(purchase_date).toLocaleDateString()}
        </chakra.p>

        <chakra.p
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Model Name:</strong> {model_name}{' '}
          {/* Updated from device_model_id */}
        </chakra.p>

        <chakra.p
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Warranty:</strong> {warranty_period}
        </chakra.p>

        <chakra.p
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Additional Info:</strong> {additional_info}
        </chakra.p>

        <chakra.p
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Plan Type:</strong> {plan_type_name}{' '}
          {/* Updated from plan_type_id */}
        </chakra.p>

        <chakra.p
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Coverage Details:</strong> {coverage_details}
        </chakra.p>

        <chakra.p
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          <strong>Expiration Date:</strong>{' '}
          {new Date(expiration_date).toLocaleDateString()}
        </chakra.p>
      </Box>
    </Flex>
  );
};

export default PhoneCard;
