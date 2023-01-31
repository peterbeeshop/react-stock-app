import {
	AnyAction,
	AsyncThunkPayloadCreator,
	combineReducers,
	configureStore,
	createAsyncThunk,
	Reducer,
} from '@reduxjs/toolkit';
import { history } from '../utils/history';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from './AuthSlice';
import watchlistReducer from './watchlist';
import portfolioReducer from './portfolio';

const reducers = combineReducers({
	router: connectRouter(history) as Reducer<RouterState, AnyAction>,
	user: userReducer,
	watchlist: watchlistReducer,
	portfolio: portfolioReducer,
});

/**
 * Configuration for redux-persist
 */
const persistConfig = {
	key: 'wallstreet', // The key used to store it in LocalStorage
	storage,
	// whitelist: ['users'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(routerMiddleware(history)),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/**
 * Configure the Thunk action creator
 */

export interface IThunkApi {
	dispatch?: AppDispatch;
	state: RootState;
}

export function createThunkAction<ReturnType, ArgType>(
	actionType: string,
	payloadCreator: AsyncThunkPayloadCreator<ReturnType, ArgType, IThunkApi>,
) {
	return createAsyncThunk<ReturnType, ArgType, IThunkApi>(actionType, payloadCreator);
}

export default store;
