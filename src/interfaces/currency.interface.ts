export interface Currency {
	currencies: {
		[currencyCode: string]: string;
	};
}

export interface CurrencyCountryPair {
	currency: string;
	country: string;
}
