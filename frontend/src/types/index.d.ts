export type ProductProps = {
  name: string;
  price: number;
  image: string;
};

export type CreateProductResponse = {
  success: boolean;
  message: string;
};
