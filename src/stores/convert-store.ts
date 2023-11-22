import { defineStore } from 'pinia';
import { fetchConversionWithHeaders } from '../services/currencyService';
import {
	type ConversionQueryData,
	type Conversion,
} from '@/interfaces/conversion.interface';
import { type StringKeyObject } from '../interfaces/generics.interface';
import { type ResponseError } from '../interfaces/generics.interface';
import { isResponseError } from '../services/errorService';

export const useConvertStore = defineStore('convert', {
	state: () => {
		return {
			conversion: null as null | Conversion,
			loading: false,
			error: null as null | ResponseError,
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
			} catch (e) {
				if (isResponseError(e)) {
					this.error = e;
				}

				throw e;
			} finally {
				this.loading = false;
			}
		},

		clearError() {
			this.error = null;
		},
	},
});
