import { Spinner, Modal, ModalOverlay, ModalContent, Center } from '@chakra-ui/react';

interface FullLoadingProps {
  isLoading: boolean;
}

const FullLoading: React.FC<FullLoadingProps> = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Modal isOpen={isLoading} onClose={() => {}} closeOnOverlayClick={false} isCentered>
      <ModalOverlay bg="rgba(255, 255, 255, 0.7)" />
      <ModalContent background="transparent" boxShadow="none">
        <Center height="100vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default FullLoading;
