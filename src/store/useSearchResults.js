import create from "zustand";

const useSearchStore = create((set) => ({
	results: [],
	setResults: (result) => {
		set(() => ({ results: result }));
	},
}));

export default useSearchStore;
