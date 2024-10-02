export type ProductProps = {
  _id?: string;
  name: string;
  price: number;
  image: string;
};

export type CreDelProductResponse = {
  success: boolean;
  message: string;
};
