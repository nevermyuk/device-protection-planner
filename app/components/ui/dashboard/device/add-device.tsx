'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { fetchDeviceModels, fetchManufacturers } from '@/app/dashboard/action';

interface FormData {
  deviceName: string;
  deviceType: string;
  purchaseDate: string;
  deviceModel: string;
  manufacturer: string;
  warrantyPeriod: string;
  additionalInfo: string;
  planName: string;
  coverageDetails: string;
}

interface DeviceFormProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

interface Manufacturer {
  id: string;
  name: string;
}

const DeviceForm = ({ formData, setFormData }: DeviceFormProps) => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [deviceModels, setDeviceModels] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');

  useEffect(() => {
    async function loadManufacturers() {
      const manufacturersList = await fetchManufacturers();
      setManufacturers(manufacturersList);
    }
    loadManufacturers();
  }, []);

  const handleManufacturerChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedManufacturerId = e.target.value;
    setSelectedManufacturer(selectedManufacturerId);

    // Fetch and set device models based on the selected manufacturer
    const models = await fetchDeviceModels(selectedManufacturerId);
    setDeviceModels(models);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Device Information
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="device-name" fontWeight={'normal'}>
            Device Name
          </FormLabel>
          <Input
            id="device-name"
            value={formData.deviceName}
            onChange={(e) =>
              setFormData({ ...formData, deviceName: e.target.value })
            }
            placeholder="e.g., John's work phone"
          />
        </FormControl>
      </Flex>

      <FormControl mt="2%">
        <FormLabel htmlFor="purchase-date" fontWeight={'normal'}>
          Purchase Date
        </FormLabel>
        <Input
          id="purchase-date"
          type="date"
          value={formData.purchaseDate}
          onChange={(e) =>
            setFormData({ ...formData, purchaseDate: e.target.value })
          }
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="manufacturer" fontWeight={'normal'}>
          Manufacturer
        </FormLabel>
        <Select
          id="manufacturer"
          value={selectedManufacturer}
          onChange={handleManufacturerChange}
          placeholder="Select a manufacturer"
        >
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {selectedManufacturer && (
        <FormControl mt="2%">
          <FormLabel htmlFor="device-model" fontWeight={'normal'}>
            Device Model
          </FormLabel>
          <Select
            id="device-model"
            value={formData.deviceModel}
            onChange={(e) =>
              setFormData({ ...formData, deviceModel: e.target.value })
            }
            placeholder="Select a model"
          >
            {deviceModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl mt="2%">
        <FormLabel htmlFor="warranty-period" fontWeight={'normal'}>
          Warranty Period
        </FormLabel>
        <Input
          id="warranty-period"
          type="text"
          value={formData.warrantyPeriod}
          onChange={(e) =>
            setFormData({ ...formData, warrantyPeriod: e.target.value })
          }
          placeholder="e.g., 1 year"
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="additional-info" fontWeight={'normal'}>
          Additional Information
        </FormLabel>
        <Textarea
          id="additional-info"
          value={formData.additionalInfo}
          onChange={(e) =>
            setFormData({ ...formData, additionalInfo: e.target.value })
          }
          placeholder="Any additional information about the device"
          rows={3}
        />
      </FormControl>
    </>
  );
};

const DeviceForm3 = ({ formData, setFormData }: DeviceFormProps) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Protection Plan
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
          >
            Plan Name
          </FormLabel>
          <Input
            type="text"
            placeholder="e.g., Basic Coverage"
            value={formData.planName}
            onChange={(e) =>
              setFormData({ ...formData, planName: e.target.value })
            }
            focusBorderColor="brand.400"
            rounded="md"
          />
        </FormControl>

        <FormControl id="coverage-details" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
          >
            Coverage Details
          </FormLabel>
          <Textarea
            placeholder="Coverage details for the protection plan"
            rows={3}
            value={formData.coverageDetails}
            onChange={(e) =>
              setFormData({ ...formData, coverageDetails: e.target.value })
            }
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
          <FormHelperText>
            Provide details about the coverage offered.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function DeviceRegistrationForm() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [formData, setFormData] = useState<FormData>({
    deviceName: '',
    deviceType: '',
    purchaseDate: '',
    deviceModel: '',
    manufacturer: '',
    warrantyPeriod: '',
    additionalInfo: '',
    planName: '',
    coverageDetails: '',
  });

  const handleSubmit = async () => {
    const response = await fetch('/api/register-device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: 'Device registered.',
        description:
          'Your device and protection plan details have been recorded.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: 'There was an issue registering your device.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <DeviceForm formData={formData} setFormData={setFormData} />
        ) : (
          <DeviceForm3 formData={formData} setFormData={setFormData} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 2) {
                    setProgress(66.66);
                  } else if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
