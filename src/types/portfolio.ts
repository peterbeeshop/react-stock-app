export interface Portfolio {
	_id: string;
	name: string;
	stock?: string;
	shares?: number;
	averagePrice?: number;
	createdAt?: string;
	updatedAt?: string;
}
