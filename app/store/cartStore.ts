import { create } from "zustand";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  stripeProductId: string;
  stripePriceId: string;
}

interface CartState {
  products: IProduct[];
  increment: (product: IProduct) => void;
  decrement: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: [],

  increment: (product) =>
    set((state) => {
      const exists = state.products.some((p) => p.id === product.id);

      if (exists) {
        return {
          products: state.products.map((p) =>
            p.id === product.id ? { ...p, count: p.count + 1 } : p,
          ),
        };
      }

      return {
        products: [...state.products, { ...product, count: 1 }],
      };
    }),

  decrement: (productId) =>
    set((state) => {
      const product = state.products.find((p) => p.id === productId);

      if (!product) return state;

      if (product.count === 1) {
        return {
          products: state.products.filter((p) => p.id !== productId),
        };
      }

      return {
        products: state.products.map((p) =>
          p.id === productId ? { ...p, count: p.count - 1 } : p,
        ),
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  clearCart: () =>
    set({
      products: [],
    }),
}));
