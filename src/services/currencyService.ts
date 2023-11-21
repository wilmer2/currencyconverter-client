import axiosAdapter from '../utils/axiosAdapter';
import { type Currency } from '../interfaces/currency.interface';
import { type ConversionQueryData } from '@/interfaces/conversion.interface';

import { type StringKeyObject } from '../interfaces/generics.interface';

export const fetchCurrencies = async (): Promise<Currency> => {
	const response = await axiosAdapter.get<Currency>('currencies');

	return response.data;
};

export const fetchCurrencyConversion = async (params: ConversionQueryData) => {
	const response = await axiosAdapter.get('currencies/convert', params);

	return response.data;
};

export const fetchConversionWithHeaders = async (
	params: ConversionQueryData,
	headers: StringKeyObject
) => {
	const response = await axiosAdapter.getWithCustomHeaders(
		'currencies/convert',
		params,
		headers
	);

	return response.data;
};

export default {
	fetchCurrencies,
	fetchCurrencyConversion,
};
