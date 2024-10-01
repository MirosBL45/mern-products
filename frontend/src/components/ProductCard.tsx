import { ProductProps } from '../types';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react';

type ProductCardProps = {
  product: ProductProps;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, image } = product;
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

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
        <Heading as='h3' size='md' mb={2}>
          {name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${price}
        </Text>

        <HStack spacing={2}>
          <IconButton aria-label='Search database' icon={<EditIcon />} colorScheme='blue' />
          <IconButton aria-label='Search database'
            icon={<DeleteIcon />}
            colorScheme='red'
          />
        </HStack>
      </Box>
    </Box>
  );
}
