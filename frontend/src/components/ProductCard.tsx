import { ProductProps } from '../types';
import { Box, Image } from '@chakra-ui/react';

type ProductCardProps = {
  product: ProductProps;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, image } = product;

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      <Image src={image} alt={name} h={48} w={'full'} objectFit={'cover'} />
      <p>{price}</p>
    </Box>
  );
}
