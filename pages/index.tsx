import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Flex,
  HStack,
  Button,
  Heading,
  Center,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { ImSortAlphaDesc, ImSortAlphaAsc } from 'react-icons/im';
import { useQuery, useMutation } from 'react-query';
import Head from 'next/head';
import clsx from 'clsx';
import contactAPI, { Contact as ContactType } from '@@src/apis/clients/contactAPI';
import Contact from '@@src/components/Contact';
import UserFieldsForm from '@@src/components/UserFieldsForm';
import DeleteConfirmModal from '@@src/components/DeleteConfirmModal';
import FullLoading from '@@src/components/FullLoading';

const Home: NextPage = () => {
  const [isAsc, setIsAsc] = useState(true);
  const [sortedContacts, setSortedContacts] = useState<ContactType[]>([]);
  const [editedID, setEditedID] = useState<number | null>(null);
  const [removeContact, setRemoveContact] = useState<ContactType | null>(null);
  const [drawerTitle, setDrawerTitle] = useState('');
  const contactDrawerControl = useDisclosure();
  const deleteModalControl = useDisclosure();
  const { data, isFetching, refetch } = useQuery('contacts', () => contactAPI.getAllContacts());
  const removeActionMutation = useMutation({
    mutationFn: () => contactAPI.removeContact({ id: removeContact?.id ?? 0 }),
    onSettled: () => {
      refetch();
      deleteModalControl.onClose();
      setRemoveContact(null);
    },
  });

  const handleContactEdited = (id: number) => {
    setDrawerTitle('Edit User Contact');
    setEditedID(id);
    contactDrawerControl.onOpen();
  };

  const handleContactRemoved = (contact: ContactType) => {
    setRemoveContact(contact);
    deleteModalControl.onOpen();
  };

  const sortContacts = (contacts: ContactType[], ascending: boolean): ContactType[] => {
    return contacts.sort((a, b) => {
      if (a.first_name < b.first_name) return ascending ? -1 : 1;
      if (a.first_name > b.first_name) return ascending ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSortedContacts(sortContacts([...data], isAsc));
    }
  }, [data, isAsc]);

  return (
    <Box className="w-full">
      <Head>
        <meta name="description" content="Neptune Benchmark Data Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box id="main-title" className="p-3">
          <HStack justifyContent={'space-between'}>
            <Link>
              <b>Contact List</b>
            </Link>
            <Button
              size={'sm'}
              colorScheme="teal"
              disabled={isFetching}
              onClick={() => {
                setDrawerTitle('Create User Contact');
                contactDrawerControl.onOpen();
                setEditedID(null);
              }}
            >
              Add Contact
            </Button>
          </HStack>
        </Box>
        <Box
          bg={'gray.200'}
          id="main-content"
          className={clsx('relative p-6 flex flex-col gap-y-5')}
        >
          <Box bg="white" className={'p-6'}>
            <Box>
              <Flex minWidth="max-content" gap="2" m={5}>
                <Center p="2" w={'100%'}>
                  <Heading fontSize="2xl" fontWeight="800" as="h1">
                    Contact
                  </Heading>
                </Center>
                <ButtonGroup gap="2">
                  <IconButton
                    aria-label="sorting data"
                    icon={isAsc ? <ImSortAlphaAsc /> : <ImSortAlphaDesc />}
                    onClick={() => {
                      setIsAsc(!isAsc);
                    }}
                  />
                </ButtonGroup>
              </Flex>
              <Flex wrap="wrap" justify="flex-start">
                {sortedContacts?.map((contact: ContactType, index) => (
                  <Contact
                    key={`${contact.id}_${index}`}
                    onEdited={() => handleContactEdited(contact.id)}
                    onRemoved={() => handleContactRemoved(contact)}
                    name={`${contact.first_name} ${contact.last_name}`}
                    job={contact.job}
                    description={contact.description}
                  />
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
        {!isFetching && deleteModalControl.isOpen && removeContact && (
          <DeleteConfirmModal
            isLoading={removeActionMutation.isLoading}
            actions={deleteModalControl}
            data={removeContact}
            onSubmitDelete={() => removeActionMutation.mutate()}
          />
        )}
        {!isFetching && contactDrawerControl.isOpen && (
          <Drawer
            placement="right"
            onClose={contactDrawerControl.onClose}
            isOpen={contactDrawerControl.isOpen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>{drawerTitle}</DrawerHeader>
              <DrawerBody>
                <Center>
                  <UserFieldsForm
                    width={400}
                    getAllContacts={refetch}
                    buttonText={editedID ? 'Update' : 'Create'}
                    contactID={editedID}
                    onClosedDrawer={contactDrawerControl.onClose}
                  />
                </Center>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
        {isFetching && <FullLoading isLoading={isFetching} />}
      </main>
    </Box>
  );
};

export default Home;
