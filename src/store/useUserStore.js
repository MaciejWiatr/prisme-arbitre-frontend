import create from "zustand";
import jwt_decode from "jwt-decode";
import axios from "axios";
import url from "../helpers/url";
import { persist } from "zustand/middleware";

const useUserStore = create(
	persist(
		(set, get) => ({
			jwt: "",
			refresh: "",
			jwt_data: {},
			updateUser: (jwt, refresh) => {
				set(() => ({ jwt, refresh, jwt_data: jwt_decode(jwt) }));
			},
			refreshUser: async () => {
				const jwtResp = await axios
					.post(url("/api/token/refresh/"), {
						refresh: get().refresh,
					})
					.catch((error) => {
						console.log(error.response.data);
						console.log(error.response.status);
					});
				// console.log(jwt_decode(jwtResp.data.access));
				set(() => ({
					jwt: jwtResp.data.access,
					jwt_data: jwtResp.data.user,
				}));
			},
			logout: () => {
				set({ jwt: "", refresh: "", jwt_data: {} }, true);
			},
		}),
		{ name: "userdata" }
	)
);

export default useUserStore;
