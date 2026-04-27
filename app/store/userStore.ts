import { create } from "zustand";

export interface IAddress {
  line1: string;
  line2: string;
  city: string;
  postalCode: number;
  state: string;
  country: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: IAddress;
  stripeCustomerId: string | null;
}

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  clearUser: () =>
    set({
      user: null,
    }),
}));
