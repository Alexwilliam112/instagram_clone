import { create } from "zustand";

export default useSearchStore = create((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));
