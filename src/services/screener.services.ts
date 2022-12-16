import { apiClient } from './config';

const SERVICE_PREFIX = '/screener';

export const getAllStocks = async () => {
	return (await apiClient.get(`${SERVICE_PREFIX}/`)).data;
};
