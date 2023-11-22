export interface StringKeyObject {
	[key: string]: string;
}

export interface GenericDataError {
	detail?: string;
}

export interface ResponseError {
	status: number;
	message: string;
}

export type ButtonType = 'submit' | 'reset' | 'button' | undefined;
