import { apiClient } from './config';

const SERVICE_PREFIX = '/screener';

export const getAllStocks = async () => {
	return (await apiClient.get(`${SERVICE_PREFIX}/`)).data;
};

export const stockSearch = async (symbol: string) => {
	return (await apiClient.post(`${SERVICE_PREFIX}`, { symbol })).data;
};
