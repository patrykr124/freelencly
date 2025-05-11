import { create } from "zustand";

type SearchTitleState = {
  selectedTitle: string;
  setSelectedTitle: (title: string) => void;
};

export const useSearchTitleStore = create<SearchTitleState>((set) => ({
  selectedTitle: "",
  setSelectedTitle: (title) => set({ selectedTitle: title }),
}));
