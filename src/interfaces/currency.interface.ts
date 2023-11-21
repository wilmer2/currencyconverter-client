export interface Currency {
	currencies: {
		[currencyCode: string]: string;
	};
}

export interface CurrencyCountryPair {
	currency: string;
	country: string;
}

export interface CurrencyConversionData {
	amount: number;
	from: string;
	to: string;
}
