import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import store, { persistor } from '../src/store';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
					<QueryClientProvider client={queryClient}>
						<App />
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</GoogleOAuthProvider>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('root'),
);
