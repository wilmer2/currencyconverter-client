import { defineStore } from 'pinia';
import {
	type Currency,
	type CurrencyCountryPair,
} from '../interfaces/currency.interface';
import { fetchCurrencies } from '../services/currencyService';

export const useCurrenyStore = defineStore('currency', {
	state: () => {
		return {
			currencyList: null as Currency | null,
			loading: true,
			error: null as null | unknown,
		};
	},
	getters: {
		currencyCountryPairs(): CurrencyCountryPair[] {
			if (!this.currencyList) return [];

			return Object.entries(this.currencyList.currencies).map(
				([currency, country]) => ({
					currency,
					country,
				})
			);
		},
	},
	actions: {
		async fetchCurrencies() {
			this.loading = true;
			this.error = null;

			try {
				this.currencyList = await fetchCurrencies();
			} catch (e) {
				this.error = e;
			} finally {
				this.loading = false;
			}
		},

		clearError() {
			this.error = null;
		},
	},
});
