import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id: number;
	email: string;
	name: string;
}

interface UserState {
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

const initialState: UserState = {
	token: localStorage.getItem("token"),
	isAuthenticated: !!localStorage.getItem("token"),
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<{ token: string }>) => {
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.error = null;
			localStorage.setItem("token", action.payload.token);
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		logout: (state) => {
			state.token = null;
			state.isAuthenticated = false;
			localStorage.removeItem("token");
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const { setCredentials, setToken, logout, setLoading, setError } =
	userSlice.actions;
export default userSlice.reducer;
