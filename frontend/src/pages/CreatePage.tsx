import { useState } from 'react';
import { ProductProps } from '../types';
import {
  Box,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: '',
    price: 0,
    image: '',
  });

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
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
