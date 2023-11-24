export interface LoginTokenResponse {
	token: string;
}

export interface UserCreatedResponse {
	message: string;
}

export interface User {
	id: number;
	email: string;
	userIdentifier: string;
	roles: string[];
}

export interface UserResponse {
	user: User;
}
