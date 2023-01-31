import { Portfolio } from '../types/portfolio';
import { apiClient } from './config';

export const createPortfolio = async (name: string): Promise<Portfolio> => {
	return (await apiClient.post('/create/portfolio', { name })).data;
};

export const addStockToPortfolio = async (id: string, symbol: string, price: string, shares: string) => {
	return (await apiClient.post('/portfolios/add', { id, symbol, shares, price })).data;
};

export const getMyPortfolio = async (): Promise<Portfolio[]> => {
	return (
		await apiClient.get(`/portfolios`, {
			withCredentials: true,
		})
	).data;
};

export const viewPortfolio = async (id: string) => {
	return (await apiClient.post('/portfolios/view', { id })).data;
};
