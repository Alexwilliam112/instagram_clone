import { create } from "zustand";

export default useSelectedPost = create((set) => ({
  selectedPostId: '',
  setSelectedPostId: (results) => set({ selectedPostId: results }),
}));
