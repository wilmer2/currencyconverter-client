import { type ComputedRef, computed } from 'vue';
import { type Currency } from '@/interfaces/currency.interface';
import { type CurrencyCountryPair } from '@/interfaces/currency.interface';
import { fetchCurrencies } from '@/services/currencyService';
import { useFetch } from '@/composables/useFetch';

export const useCurrencyCountryPairs = () => {
	const {
		data: currencyList,
		error,
		loading,
		fetchData,
	} = useFetch<Currency>(fetchCurrencies);

	const currencyCountryPairs: ComputedRef<CurrencyCountryPair[]> = computed(
		() => {
			if (!currencyList.value) return [];

			const { currencies = [] } = currencyList.value;

			return Object.entries(currencies).map(([currency, country]) => ({
				currency,
				country,
			}));
		}
	);

	return {
		fetchData,
		error,
		loading,
		currencyCountryPairs,
	};
};
