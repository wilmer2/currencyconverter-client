export interface ConversionQueryData {
	amount: number;
	from: string;
	to: string;
}

export interface Conversion {
	result: number;
	query: ConversionQueryData;
	quote: number;
}
