import type {
	Conversion,
	ConversionQueryData,
} from '@/interfaces/conversion.interface';
import { fetchCurrencyConversion } from '@/services/currencyService';
import headerService from '@/services/headerService';
import { useFetch } from '@/composables/useFetch';

export const useConversion = () => {
	const {
		fetchData,
		data: conversion,
		loading,
		error,
	} = useFetch<Conversion>(fetchCurrencyConversion);

	const fetchConversion = (params: ConversionQueryData): void => {
		if (loading.value) return;

		const customHeaders = headerService.getTrackGuestHeader();

		fetchData(params, customHeaders);
	};

	const clearError = (): void => {
		error.value = null;
	};

	return {
		fetchConversion,
		clearError,
		conversion,
		loading,
		error,
	};
};
