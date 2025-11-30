// lib/store/carStore.ts
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface FilterState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CarStoreState {
  // Pagination
  page: number;
  hasMore: boolean;

  // Filters state
  filters: FilterState;

  // Favorites
  favorites: string[];
}

interface CarStoreActions {
  // Pagination actions
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;

  // Filter actions
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
  resetPage: () => void;

  // Favorites actions
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
  // State
  page: 1,
  hasMore: true,
  filters: initialFilters,
  favorites: [],

  // Pagination actions
  setPage: (page: number): void => {
    set({ page });
  },

  setHasMore: (hasMore: boolean): void => {
    set({ hasMore });
  },

  // Filter actions
  setFilters: (filters: FilterState): void => {
    set({ filters });
  },

  resetFilters: (): void => {
    set({ filters: initialFilters });
  },

  resetPage: (): void => {
    set({ page: 1 });
  },

  // Favorites actions
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