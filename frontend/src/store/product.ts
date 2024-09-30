import { create } from 'zustand';
import { ProductProps, CreateProductResponse } from '../types';

export const useProductStore = create<{
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
  createProduct: (product: ProductProps) => Promise<CreateProductResponse>;
}>((set) => ({
  products: [],
  setProducts: (products: ProductProps[]) => set({ products }),
  createProduct: async (
    newProduct: ProductProps
  ): Promise<CreateProductResponse> => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const fetchedData = await response.json();
    set((state) => ({ products: [...state.products, fetchedData.data] }));
    return { success: true, message: 'Product created successfully.' };
  },
}));
