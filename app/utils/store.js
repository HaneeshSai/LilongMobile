// store.js
import { create } from "zustand";

// Define the store
const useStore = create((set) => ({
  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),
  isPlaying: false,
  setIsplaying: (val) => set({ isPlaying: val }),
  nowPlaying: null,
  setNowPlaying: (val) => set({ nowPlaying: val }),
  sound: null,
  setSound: (val) => set({ sound: val }),
}));

export default useStore;
