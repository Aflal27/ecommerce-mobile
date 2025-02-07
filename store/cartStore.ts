// cart store
import { create } from 'zustand'

export const useCart = create((set) => ({
  items: [],
  addToCart: (product: any) =>
    set((state) => ({ items: [...state.items, { product, quentity: 1 }] })),
  resetCart: () => set({ items: [] }),
}))
