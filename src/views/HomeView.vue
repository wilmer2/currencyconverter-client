<script setup lang="ts">
import CurrencyChangeForm from '@/components/CurrencyChangeForm.vue';
import CurrencyChangeInfo from '@/components/CurrencyChangeInfo.vue';
import BtnReload from '@/components/BtnReload.vue';

import Spinner from '@/components/Spinner.vue';
import BtnLoading from '@/components/BtnLoading.vue';
import ErrorMessageVue from '@/components/ErrorMessage.vue';
import { onMounted } from 'vue';
import { useCurrenyStore } from '@/stores/currency-store';
import { useConvertStore } from '@/stores/convert-store';
import { type ConversionQueryData } from '@/interfaces/conversion.interface';
import headerService from '@/services/headerService';

const currencyStore = useCurrenyStore();
const convertStore = useConvertStore();

const fetchCurrencies = (): void => {
	if (!currencyStore.currencyList) {
		currencyStore.fetchCurrencies();
	}
};

const handleConversion = (params: ConversionQueryData) => {
	const customHeaders = headerService.getTrackGuestHeader();

	if (!customHeaders || currencyStore.loading) return;

	convertStore.fetchConversionWithHeaders(params, customHeaders);
};

onMounted(fetchCurrencies);
</script>

<template>
	<ErrorMessageVue
		v-if="convertStore.error"
		:message="convertStore.error.message"
		@onClose="convertStore.clearError"
	/>

	<BtnReload
		v-if="currencyStore.error"
		@onReload="currencyStore.fetchCurrencies"
	/>

	<Spinner v-if="currencyStore.loading" />

	<div
		v-if="currencyStore.currencyList"
		class="bg-white rounded-lg shadow-md p-6 mx-auto max-w-screen-lg mt-4"
	>
		<div :class="{ 'mb-5': convertStore.conversion || convertStore.loading }">
			<CurrencyChangeInfo
				:conversion="convertStore.conversion"
				:loading="convertStore.loading"
			/>
		</div>
		<CurrencyChangeForm
			@onSubmit="handleConversion"
			:currencyCountryPairs="currencyStore.currencyCountryPairs"
		>
			<div class="mt-5 md:mt-2 md:mb-2">
				<BtnLoading type="submit" text="Cambio" :loading="convertStore.loading">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
					>
						<circle cx="10" cy="10" r="9" stroke-width="2" />
						<path stroke-width="2" d="M12 8l2 2-2 2M8 12l-2-2 2-2" />
					</svg>
				</BtnLoading>
			</div>
		</CurrencyChangeForm>
	</div>
</template>
