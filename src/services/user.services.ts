import { AppUser } from '../types/user';
import { apiClient } from './config';

const SERVICE_PREFIX = '/signup';

export const createAppUser = async (appUser: Partial<AppUser>) => {
	return (
		await apiClient.post(
			`${SERVICE_PREFIX}`,
			{
				firstname: appUser.firstname,
				lastname: appUser.lastname,
				email: appUser.email,
				password: appUser.password,
			},
			{ headers: { 'Content-Type': 'application/json' } },
		)
	).data;
};
