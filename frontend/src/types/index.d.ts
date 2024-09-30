export type ProductProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export type CreateProductResponse = {
  success: boolean;
  message: string;
};
