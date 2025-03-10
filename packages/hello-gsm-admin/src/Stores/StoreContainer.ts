import create from 'zustand';

interface StoreType {
  selectedOption: number | null;
  setSelectedOption: (option: number) => void;
}

const useStore = create<StoreType>(set => ({
  selectedOption: 0,
  setSelectedOption: option => set({ selectedOption: option }),
}));

export default useStore;
