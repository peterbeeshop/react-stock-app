import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, createThunkAction } from '.';
import { AppUser } from '../types/user';
import * as UserService from '../services/user.services';
import * as AuthService from '../services/auth.services';
// import { push } from 'connected-react-router';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { watchlistActions } from './watchlist';
// Type for our state
export interface UserState {
	user?: Partial<AppUser>;
	authToken: string | undefined;
}

// Initial state
const initialState: UserState = {
	user: {},
	authToken: undefined,
};

// Actual Slice
export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<Partial<AppUser>>) {
			state.user = action.payload;
		},
		setAuthToken: (state, action: PayloadAction<string | undefined>) => {
			state.authToken = action.payload;
		},
	},
});

/**
 * Thunks
 */
const createAppUser = createThunkAction<void, Partial<AppUser>>(
	'users/createAppUser',
	async (userInfo, { dispatch }) => {
		try {
			const result = await UserService.createAppUser(userInfo);
			return result;
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error(err.response?.data, { position: 'top-center' });
			} else {
				toast.error('Something went wrong with the servers. Please try again!');
			}
		}
	},
);

const login = createThunkAction<void, { email: string; password: string; onSuccess?: () => void }>(
	'users/login',
	async ({ email, password, onSuccess }, { dispatch }) => {
		try {
			const { token, user } = await AuthService.login(email, password);

			dispatch(userActions.setAuthToken(token));
			dispatch(userActions.setUser(user));
			dispatch(watchlistActions.retrieveWatchlist());

			onSuccess?.();
		} catch (err) {
			if (err instanceof AxiosError) {
				toast.error(err.response?.data, { position: 'top-center' });
			} else {
				toast.error('Something went wrong with the servers. Please try again!');
			}
		}
	},
);

const logout = createThunkAction<void, void>('users/logout', async (_, { dispatch, getState }) => {
	try {
		const authToken = userSelectors.selectAuthToken(getState());

		if (authToken !== undefined) {
			await AuthService.logout();
			dispatch(userActions.setUser({}));
			dispatch(userActions.setAuthToken(undefined));
			dispatch(watchlistActions.setWatchlist([]));
			toast.error('Goodbye!');
		}
	} catch (error) {
		toast.error('An error occured on our side. Please try again!');
	}
});

export const userActions = { ...userSlice.actions, createAppUser, login, logout };

export const userSelectors = {
	selectAuthState: (state: RootState) => state.user.user,
	selectAuthToken: (state: RootState) => state.user.authToken,
	selectIsUserLoggedIn: (state: RootState) => Boolean(state.user.user?.email),
};

export default userSlice.reducer;
