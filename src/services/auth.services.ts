import { AppUser } from '../types/user';
import { apiClient } from './config';

export const login = async (email: string, password: string) => {
	return (await apiClient.post(`/login`, { email, password })).data as {
		token: string;
		user: AppUser;
	};
};

export const logout = async () => {
	await apiClient.get(`/logout`);
};
