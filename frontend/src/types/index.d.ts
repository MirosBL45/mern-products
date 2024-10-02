export type ProductProps = {
  _id?: string;
  name: string;
  price: number;
  image: string;
};

export type CUDProductResponse = {
  success: boolean;
  message: string;
};
