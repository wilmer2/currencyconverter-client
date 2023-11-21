import { defineStore } from 'pinia';
import { fetchCurrencyConversion } from '../services/currencyService';
import { type CurrencyConversionData } from '../interfaces/currency.interface';

export const useConvertStore = defineStore('convert', {
	state: () => {
		return {
			result: null as null | unknown,
			loading: false,
			error: null as null | string,
		};
	},
	actions: {
		async fetchCurrencyConversion(params: CurrencyConversionData) {
			this.loading = true;
			this.error = null;

			try {
				this.result = await fetchCurrencyConversion(params);
			} catch (e: any) {
				this.error = e.response.data.detail;
			} finally {
				this.loading = false;
			}
		},

		clearError() {
			this.error = null;
		},
	},
});
