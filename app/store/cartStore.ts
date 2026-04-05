import { create } from 'zustand';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
}

interface CartState {
  products: IProduct[];
  increment: (product: IProduct) => void;
  decrement: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: [],

  increment: (product: IProduct) => {
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        // Product exists, increment count
        return {
          products: state.products.map((p) =>
            p.id === product.id ? { ...p, count: p.count + 1 } : p,
          ),
        };
      } else {
        // Product doesn't exist, add it with count 1
        return {
          products: [...state.products, { ...product, count: 1 }],
        };
      }
    });
  },

  decrement: (productId: number) => {
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === productId);

      if (!existingProduct) return state;

      if (existingProduct.count <= 1) {
        // Remove item if count reaches 0
        return {
          products: state.products.filter((p) => p.id !== productId),
        };
      } else {
        // Decrease count
        return {
          products: state.products.map((p) =>
            p.id === productId ? { ...p, count: p.count - 1 } : p,
          ),
        };
      }
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    }));
  },
}));
