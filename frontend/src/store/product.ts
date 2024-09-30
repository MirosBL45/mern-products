import { create } from 'zustand';
import { ProductProps } from '../types';

export const useProductStore = create<{
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
  createProduct: (product: ProductProps) => void;
}>((set) => ({
  products: [],
  setProducts: (products: ProductProps[]) => set({ products }),
  createProduct: async (newProduct: ProductProps) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }
  },
}));
