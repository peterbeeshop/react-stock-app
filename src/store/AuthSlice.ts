import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, createThunkAction } from '.';
import { AppUser } from '../types/user';
// import * as UserService from '../services/user.services';
import * as AuthService from '../services/auth.services';
import { push } from 'connected-react-router';

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

// export const createAppUser = createAsyncThunk('users/create', async (userInfo: AppUser) => {
// 	try {
// 		// Fetch the backend endpoint:
// 		const response = await UserService.createAppUser(userInfo);
// 		console.log(response);
// 		// Return result:
// 		return response;
// 	} catch (err) {
// 		if (err instanceof Error) {
// 			console.log('an error occured in createAppuser');
// 			console.log(err.message);
// 		} else {
// 			console.log('Unexpected error', err);
// 		}
// 	}
// });

const login = createThunkAction<void, { email: string; password: string; onSuccess?: () => void }>(
	'users/login',
	async ({ email, password, onSuccess }, { dispatch }) => {
		try {
			const { token, user } = await AuthService.login(email, password);

			dispatch(userActions.setAuthToken(token));
			// dispatch(userActions.setRefreshToken(refreshToken));
			dispatch(userActions.setUser(user));

			onSuccess?.();
		} catch (err) {
			if (err instanceof Error) {
				console.log('an error occured in createAppuser');
				console.log(err.message);
			} else {
				console.log('Unexpected error', err);
			}
		}
	},
);

const logout = createThunkAction<void, void>('users/logout', async (_, { dispatch, getState }) => {
	try {
		const authToken = userSelectors.selectAuthToken(getState());

		if (authToken !== undefined) {
			await AuthService.logout(authToken);
		}
	} catch (error) {
		console.log(error);
		// dispatch(sharedActions.setToastStatus({ status: 'error', message: 'Internal Server Error :(' }));
	} finally {
		dispatch(userActions.setUser({}));
		dispatch(userActions.setAuthToken(undefined));
		dispatch(push('/login'));
	}
});

export const userActions = { ...userSlice.actions, login, logout };

export const userSelectors = {
	selectAuthState: (state: RootState) => state.user.user,
	selectAuthToken: (state: RootState) => state.user.authToken,
	selectIsUserLoggedIn: (state: RootState) => Boolean(state.user.user?.email),
};

export default userSlice.reducer;
