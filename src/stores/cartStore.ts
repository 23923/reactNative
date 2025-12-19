import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  cupSize: string;
  sugarLevel: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) => {
    const existingItem = get().items.find(
      (i) => i.productId === item.productId && i.cupSize === item.cupSize && i.sugarLevel === item.sugarLevel
    );

    if (existingItem) {
      // Si le produit existe déjà avec les mêmes options, augmenter la quantité
      set((state) => ({
        items: state.items.map((i) =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      }));
    } else {
      // Sinon, ajouter comme nouveau produit
      const id = `${item.productId}-${item.cupSize}-${item.sugarLevel}`;
      set((state) => ({
        items: [...state.items, { ...item, id }],
      }));
    }
  },

  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getDiscount: () => {
    const subtotal = get().getSubtotal();
    // 25% de réduction si plus de 2 articles
    return get().items.length >= 2 ? Math.floor(subtotal * 0.25) : 0;
  },

  getTotal: () => {
    return get().getSubtotal() - get().getDiscount();
  },
}));
