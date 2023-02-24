import { apiClient } from './config';

export const subscribeUsingPayPal = async (price: number) => {
	return (await apiClient.post('/subscribe/paypal', { price })).data;
};
export const successPayment = async () => {
	return (await apiClient.get('/success')).data;
};
export const cancelPayment = async (price: number) => {
	return (await apiClient.get('/cancel')).data;
};
