import { useState } from 'react';
import { ProductProps } from '../types';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { showErrorToast, showSuccessToast } from '../components/ToastMessages';

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: '',
    price: 0,
    image: '',
  });

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { createProduct } = useProductStore();

  async function handleAddProduct() {
    setLoading(true);

    const { success, message } = await createProduct(newProduct);

    if (!success) {
      // toast({
      //   title: 'Error',
      //   description: message,
      //   status: 'error',
      //   isClosable: true,
      // });
      showErrorToast(toast, message);
    } else {
      // toast({
      //   title: 'Success',
      //   description: message,
      //   status: 'success',
      //   isClosable: true,
      // });
      showSuccessToast(toast, message);
      setNewProduct({
        name: '',
        price: 0,
        image: '',
      });
    }

    setLoading(false);
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
            <Input
              placeholder="Image Url"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
