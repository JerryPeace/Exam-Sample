import React from 'react';
import { Box, Text, Button, Card, HStack, Stack, Avatar } from '@chakra-ui/react';

interface ContactProps {
  name: string;
  job: string;
  description: string;
  onEdited: () => void;
  onRemoved: () => void;
}

const Contact: React.FC<ContactProps> = ({ name, job, description, onEdited, onRemoved }) => {
  return (
    <Box w={{ base: '100%', md: '50%' }} p={2}>
      <Card variant="outline">
        <Box p="6">
          <HStack justifyContent="space-between">
            <HStack alignItems="flex-start">
              <Avatar size={'lg'} src="https://bit.ly/sage-adebayo" mr={3} />
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {name}
                </Text>
                <Text mt={2}>{`Job: ${job}`}</Text>
                <Text mt={2}>{`Description: ${description}`}</Text>
              </Box>
            </HStack>
            <Stack>
              <Button colorScheme="teal" size="sm" onClick={onEdited} data-testid="edit_btn">
                Edit
              </Button>
              <Button colorScheme="red" size="sm" onClick={onRemoved} data-testid="delete_btn">
                Delete
              </Button>
            </Stack>
          </HStack>
        </Box>
      </Card>
    </Box>
  );
};

export default Contact;
