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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useRef, useState } from 'react';

import { showErrorToast, showSuccessToast } from './ToastMessages';

type ProductCardProps = {
  product: ProductProps;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { name, price, image, _id } = product;

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const toast = useToast();

  const { deleteProduct, updateProduct } = useProductStore();

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

  async function handleUpdateProduct(
    pid: any,
    updatedProduct: ProductProps,
    toast: any
  ) {
    const { success, message } = await updateProduct(pid, updatedProduct);

    onClose();

    if (!success) {
      showErrorToast(toast, message);
    } else {
      showSuccessToast(toast, message);
    }
  }

  async function onDeleteConfirm() {
    await handleDeleteProduct(_id, deleteProduct, toast);
    onCloseAlert();
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
            onClick={onOpen}
          />
          <IconButton
            aria-label="Search database"
            icon={<DeleteIcon />}
            onClick={() => setIsOpenAlert(true)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
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
              <Button ref={cancelRef} onClick={onCloseAlert}>
                No
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(_id, updatedProduct, toast)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
