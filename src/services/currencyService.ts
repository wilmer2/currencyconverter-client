import axiosAdapter from '../utils/axiosAdapter';
import {
	type Currency,
	type CurrencyConversionData,
} from '../interfaces/currency.interface';

export const fetchCurrencies = async (): Promise<Currency> => {
	const response = await axiosAdapter.get<Currency>('currencies');

	return response.data;
};

export const fetchCurrencyConversion = async (
	params: CurrencyConversionData
) => {
	const response = await axiosAdapter.get('currencies/convert', params);

	return response.data;
};

export default {
	fetchCurrencies,
	fetchCurrencyConversion,
};
