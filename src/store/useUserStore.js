import create from "zustand";
import jwt_decode from "jwt-decode";

const useUserStore = create((set) => ({
	jwt: "",
	refresh: "",
	user: {},
	updateUser: (jwt, refresh) => {
		set(() => ({ jwt, refresh, user: jwt_decode(jwt) }));
	},
}));

export default useUserStore;
