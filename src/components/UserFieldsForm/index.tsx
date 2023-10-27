import { useEffect, useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import {
  Box,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  SkeletonText,
  Stack,
  HStack,
} from '@chakra-ui/react';
import {
  userFieldConfig,
  UserFieldConfigItem,
  UserFieldKey,
  initialState,
  UserDataType,
} from '@@src/constants/user';
import { useMutation } from 'react-query';
import contactAPI from '@@src/apis/clients/contactAPI';

interface UserFieldsFormProps {
  width: number;
  onClosedDrawer?: () => void;
  getAllContacts: () => void;
  buttonText: string;
  contactID?: number | null;
}

const UserFieldsForm: React.FC<UserFieldsFormProps> = ({
  width,
  buttonText,
  contactID,
  onClosedDrawer,
  getAllContacts,
}: UserFieldsFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [initialValues, setInitialValues] = useState<UserDataType>(initialState);
  const getContactContext = useMutation({
    mutationFn: (id: number) => contactAPI.getSingleContact({ id }),
    onSuccess: (data) => {
      setValue(UserFieldKey.first_name, data.first_name);
      setValue(UserFieldKey.last_name, data.last_name);
      setValue(UserFieldKey.job, data.job);
      setValue(UserFieldKey.description, data.description);
      setInitialValues(data);
    },
  });

  const createContext = useMutation({
    mutationFn: (values: any) => contactAPI.createContact({ data: values }),
    onSuccess: () => {
      getAllContacts();
      onClosedDrawer && onClosedDrawer();
    },
  });
  const updateContext = useMutation({
    mutationFn: (values: any) => contactAPI.updateContact(values),
    onSuccess: () => {
      getAllContacts();
      onClosedDrawer && onClosedDrawer();
    },
  });

  useEffect(() => {
    if (contactID) {
      getContactContext.mutate(contactID);
    }
    // getContactContext always return new instance, it will cause re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactID]);

  const loading = createContext.isLoading || updateContext.isLoading;
  const onSubmit = (data: FieldValues) => {
    const changedValues = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== initialValues[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {} as UserDataType);

    if (contactID) {
      updateContext.mutate({
        info: changedValues,
        id: contactID,
      });
    } else {
      createContext.mutate({
        contact: data,
      });
    }
  };

  return (
    <Box w={width} mb={4}>
      {getContactContext.isLoading ? (
        <SkeletonText mt="4" noOfLines={15} spacing="4" skeletonHeight="2" />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} mb={8}>
            {Object.values(userFieldConfig).map((item: UserFieldConfigItem) => (
              <FormControl
                key={item.label}
                isInvalid={!!errors[item.field]}
                isRequired={item.validation.required}
              >
                <FormLabel>{item.label}</FormLabel>
                <Controller
                  render={({ field }) => {
                    if (item.type === 'textarea') {
                      return <Textarea {...field} />;
                    }
                    return <Input {...field} />;
                  }}
                  name={item.field}
                  control={control}
                  defaultValue={item.defaultValue || ''}
                  rules={item.validation}
                />
                <FormErrorMessage>{errors[item.field]?.message}</FormErrorMessage>
              </FormControl>
            ))}
          </Stack>
          <HStack spacing={4}>
            <Button type="submit" colorScheme="teal" isLoading={loading}>
              {buttonText}
            </Button>
            <Button onClick={onClosedDrawer} isLoading={loading}>
              Cancel
            </Button>
          </HStack>
        </form>
      )}
    </Box>
  );
};

export default UserFieldsForm;
