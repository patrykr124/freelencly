import { create } from "zustand";

interface PopupState {
    isPopup: boolean;
    togglePopup: (value? : boolean) => void;
  }

const closePopup = create<PopupState>((set) => ({
    isPopup: false,
    togglePopup: (value?:boolean ) => set(state => ({isPopup: value ?? !state.isPopup}))
}))


export default closePopup;