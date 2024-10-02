import { ProductProps } from '../types';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useRef, useState } from 'react';

import { showErrorToast, showSuccessToast } from './ToastMessages';

type ProductCardProps = {
  product: ProductProps;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<any>();

  const { name, price, image, _id } = product;

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const toast = useToast();

  const { deleteProduct } = useProductStore();
  async function handleDeleteProduct(
    pid: any,
    deleteProduct: (pid: string) => Promise<any>,
    toast: any
  ) {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      showErrorToast(toast, message);
    } else {
      showSuccessToast(toast, message);
    }
  }

  async function onDeleteConfirm() {
    await handleDeleteProduct(_id, deleteProduct, toast);
    onClose();
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={image} alt={name} h={48} w={'full'} objectFit={'cover'} />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="Search database"
            icon={<EditIcon />}
            colorScheme="blue"
          />
          <IconButton
            aria-label="Search database"
            icon={<DeleteIcon />}
            // onClick={() => handleDeleteProduct(_id)}
            onClick={() => setIsOpen(true)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
