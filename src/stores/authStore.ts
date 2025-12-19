// src/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersData from '../data/users.json';

interface User {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  location?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // État initial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Action de connexion
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulation d'un délai réseau
        await new Promise<void>(resolve => setTimeout(() => resolve(), 500));

        // Authentification depuis le fichier JSON
        const foundUser = usersData.users.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          const user: User = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            photo: foundUser.photo,
            location: foundUser.location,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } else {
          set({ 
            error: 'Nom d\'utilisateur ou mot de passe incorrect',
            isLoading: false 
          });
          return { success: false, error: 'Nom d\'utilisateur ou mot de passe incorrect' };
        }
      },

      // Action de déconnexion
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Effacer les erreurs
      clearError: () => set({ error: null }),

      // Mettre à jour l'utilisateur
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);