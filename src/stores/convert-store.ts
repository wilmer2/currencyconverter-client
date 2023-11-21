import { defineStore } from 'pinia';
import { fetchConversionWithHeaders } from '../services/currencyService';
import {
	type ConversionQueryData,
	type Conversion,
} from '@/interfaces/conversion.interface';
import { type StringKeyObject } from '../interfaces/generics.interface';

export const useConvertStore = defineStore('convert', {
	state: () => {
		return {
			conversion: null as null | Conversion,
			loading: false,
			error: null as null | string,
		};
	},
	actions: {
		async fetchConversionWithHeaders(
			params: ConversionQueryData,
			headers: StringKeyObject
		) {
			this.loading = true;
			this.error = null;

			try {
				this.conversion = await fetchConversionWithHeaders(params, headers);
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
