import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';

export interface FilterState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CarStoreState {
  page: number;
  hasMore: boolean;
  filters: FilterState;
  favorites: string[];
}

interface CarStoreActions {
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;

  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
  resetPage: () => void;

  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

type CarStore = CarStoreState & CarStoreActions;

const initialFilters: FilterState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

const carStoreCreator: StateCreator<
  CarStore,
  [['zustand/persist', unknown]]
> = (set, get) => ({
  page: 1,
  hasMore: true,
  filters: initialFilters,
  favorites: [],

  setPage: (page: number): void => {
    set({ page });
  },

  setHasMore: (hasMore: boolean): void => {
    set({ hasMore });
  },

  setFilters: (filters: FilterState): void => {
    set({ filters });
  },

  resetFilters: (): void => {
    set({ filters: initialFilters });
  },

  resetPage: (): void => {
    set({ page: 1 });
  },

  addFavorite: (carId: string): void => {
    set((state: CarStoreState) => ({
      favorites: [...new Set([...state.favorites, carId])],
    }));
  },

  removeFavorite: (carId: string): void => {
    set((state: CarStoreState) => ({
      favorites: state.favorites.filter((id: string) => id !== carId),
    }));
  },

  isFavorite: (carId: string): boolean => {
    const state = get();
    return state.favorites.includes(carId);
  },
});

export const useCarStore = create<CarStore>()(
  persist(carStoreCreator, {
      name: 'car-store',
  })
);