export interface AppUser {
	id?: number;
	firstname: string;
	lastname: string;
	email: string;
	password?: string;
	isSubscribed?: boolean;
	resetPasswordToken?: string;
	resetPasswordExpires?: Date;
	created_at?: string;
	updated_at?: string;
}
