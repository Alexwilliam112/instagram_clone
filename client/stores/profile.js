import { create } from "zustand";

export default useProfileStore = create((set) => ({
  selectedProfile: {},
  setSelectedProfile: (results) => set({ selectedProfile: results }),
}));
