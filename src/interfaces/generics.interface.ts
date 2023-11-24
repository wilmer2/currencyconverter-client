export interface StringKeyObject {
	[key: string]: string;
}

export interface GenericDataError {
	detail?: string;
	errors?: { [key: string]: string[] };
}

export interface ErrorResponse {
	status: number;
	message: string;
	fieldErrors: null | { [key: string]: string[] };
}

export interface AsyncCallback<T> {
	(params?: any, headers?: StringKeyObject): Promise<T>;
}

export type ButtonType = 'submit' | 'reset' | 'button' | undefined;
export type InputType = 'text' | 'password' | 'number' | 'email' | 'date';

export interface FieldData {
	label: string;
	placeholder?: string;
	name: string;
	type: InputType;
}
