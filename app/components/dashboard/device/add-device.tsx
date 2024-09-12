'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
import {
  fetchDeviceModels,
  fetchManufacturers,
  fetchPlanTypes,
} from '@/app/dashboard/action';
import { useSession } from 'next-auth/react';

interface FormData {
  deviceName: string;
  purchaseDate: string;
  deviceModel: string;
  manufacturer: string;
  warrantyPeriod: string;
  additionalInfo: string;
  planType: string;
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
  const [deviceModels, setDeviceModels] = useState<
    { id: string; model: string }[]
  >([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [errors] = useState<{ [key: string]: string }>({});

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
    setFormData({ ...formData, manufacturer: selectedManufacturerId });

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
        <FormControl mr="5%" isInvalid={!!errors.deviceName}>
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
          {errors.deviceName && (
            <FormHelperText color="red.500">{errors.deviceName}</FormHelperText>
          )}
        </FormControl>
      </Flex>

      <FormControl mt="2%" isInvalid={!!errors.purchaseDate}>
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
        {errors.purchaseDate && (
          <FormHelperText color="red.500">{errors.purchaseDate}</FormHelperText>
        )}
      </FormControl>

      <FormControl mt="2%" isInvalid={!!errors.manufacturer}>
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
        {errors.manufacturer && (
          <FormHelperText color="red.500">{errors.manufacturer}</FormHelperText>
        )}
      </FormControl>

      <FormControl mt="2%" isInvalid={!!errors.deviceModel}>
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
          isDisabled={!selectedManufacturer} // Disable if no manufacturer is selected
          bg={!selectedManufacturer ? 'gray.200' : 'white'} // Gray out the background if disabled
        >
          {deviceModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.model}
            </option>
          ))}
        </Select>
        {errors.deviceModel && (
          <FormHelperText color="red.500">{errors.deviceModel}</FormHelperText>
        )}
      </FormControl>

      <FormControl mt="2%" isInvalid={!!errors.warrantyPeriod}>
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
        {errors.warrantyPeriod && (
          <FormHelperText color="red.500">
            {errors.warrantyPeriod}
          </FormHelperText>
        )}
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

const PlanForm = ({ formData, setFormData }: DeviceFormProps) => {
  const [planTypes, setPlanTypes] = useState<
    { id: string; type_name: string }[]
  >([]);

  useEffect(() => {
    async function loadPlanTypes() {
      const planTypesList = await fetchPlanTypes();
      setPlanTypes(planTypesList);
    }
    loadPlanTypes();
  }, []);
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
            Plan Type
          </FormLabel>
          <Select
            placeholder="Select a plan type"
            value={formData.planType}
            onChange={(e) =>
              setFormData({ ...formData, planType: e.target.value })
            }
            focusBorderColor="brand.400"
            rounded="md"
          >
            {planTypes.map((planType) => (
              <option key={planType.id} value={planType.id}>
                {planType.type_name}
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function DeviceRegistrationForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [formData, setFormData] = useState<FormData>({
    deviceName: '',
    purchaseDate: '',
    deviceModel: '',
    manufacturer: '',
    warrantyPeriod: '',
    additionalInfo: '',
    planType: '',
  });

  const validateForm = () => {
    // Add validation rules for the form fields
    const errors: { [key: string]: string } = {};
    if (step === 1) {
      if (!formData.deviceName) errors.deviceName = 'Device name is required.';
      if (!formData.purchaseDate)
        errors.purchaseDate = 'Purchase date is required.';
      if (!formData.manufacturer)
        errors.manufacturer = 'Manufacturer is required.';
      if (!formData.deviceModel)
        errors.deviceModel = 'Device model is required.';
      if (!formData.warrantyPeriod)
        errors.warrantyPeriod = 'Warranty period is required.';
    } else if (step === 2) {
      // Add validation rules for second step if needed
    }
    // If there are errors, return false
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateForm()) {
      setStep(step + 1);
      setProgress(66.66);
    } else if (step === 2) {
      handleSubmit(); // Handle form submission
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setProgress(step === 2 ? 33.33 : progress - 33.33); // Adjust progress for 2 steps
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, session }),
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
      router.push('/dashboard');
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
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
        {step === 1 ? (
          <DeviceForm formData={formData} setFormData={setFormData} />
        ) : (
          <PlanForm formData={formData} setFormData={setFormData} />
        )}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={handleBack}
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
                onClick={handleNext}
                colorScheme="teal"
                variant="outline"
                isDisabled={step === 2 && !validateForm()} // Disable Next button if form is invalid
              >
                {step === 2 ? 'Submit' : 'Next'}
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
