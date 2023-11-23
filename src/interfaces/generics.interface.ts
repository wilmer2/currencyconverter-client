export interface StringKeyObject {
	[key: string]: string;
}

export interface GenericDataError {
	detail?: string;
}

export interface ErrorResponse {
	status: number;
	message: string;
}

export interface AsyncCallback<T> {
	(params?: any, headers?: StringKeyObject): Promise<T>;
}

export type ButtonType = 'submit' | 'reset' | 'button' | undefined;
