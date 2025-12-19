import { create } from 'zustand';

interface FavoritesState {
  favorites: string[];
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (productId) => {
    set((state) => ({
      favorites: [...state.favorites, productId],
    }));
  },

  removeFavorite: (productId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== productId),
    }));
  },

  toggleFavorite: (productId) => {
    const { favorites } = get();
    if (favorites.includes(productId)) {
      get().removeFavorite(productId);
    } else {
      get().addFavorite(productId);
    }
  },

  isFavorite: (productId) => {
    return get().favorites.includes(productId);
  },
}));
