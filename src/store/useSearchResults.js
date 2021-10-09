import create from "zustand";

const useSearchStore = create((set) => ({
	results: [],
	isLoading: false,
	setResults: (result) => {
		set((state) => ({ ...state, results: result }));
	},
	setLoading: (value) => {
		set((state) => ({ ...state, isLoading: value }));
	},
}));

export default useSearchStore;
