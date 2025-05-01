import { create } from "zustand";

type infoState = {
    open: boolean,
    openPopup: () => void,
    closePopup: () => void,
    togglePopup: () => void
}

export const useTaskInfo = create<infoState>((set) => ({
    open: false,
    openPopup: () => set({ open: true }),
    closePopup: () => set({ open: false }),
    togglePopup: () => set((state) => ({open: !state.open}))
}))