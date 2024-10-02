import { create } from 'zustand';
import { ProductProps, CUDProductResponse } from '../types';

export const useProductStore = create<{
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
  createProduct: (product: ProductProps) => Promise<CUDProductResponse>;
  fetchProducts: () => void;
  deleteProduct: (pid: string) => Promise<CUDProductResponse>;
  updateProduct: (
    pid: string,
    product: ProductProps
  ) => Promise<CUDProductResponse>;
}>((set) => ({
  products: [],
  setProducts: (products: ProductProps[]) => set({ products }),
  createProduct: async (
    newProduct: ProductProps
  ): Promise<CUDProductResponse> => {
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
  fetchProducts: async () => {
    // by default fetch makes GET request when there is no 2nd argument
    const response = await fetch('/api/products');
    const fetchedData = await response.json();
    set({ products: fetchedData.data });
  },
  deleteProduct: async (pid: string) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: 'DELETE',
    });
    const fetchedData = await response.json();
    if (!fetchedData.success)
      return { success: false, message: fetchedData.message };
    // update the UI immediately without refresh in the browser
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: fetchedData.message };
  },
  updateProduct: async (pid: string, updatedProduct: ProductProps) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    const fetchedData = await response.json();
    if (!fetchedData.success)
      return { success: false, message: fetchedData.message };
    // update the UI immediately without refresh in the browser
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? fetchedData.data : product
      ),
    }));
    return { success: true, message: fetchedData.message };
  },
}));
