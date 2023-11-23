<script setup lang="ts">
import BtnReload from '@/components/BtnReload.vue';
import BtnLoading from '@/components/BtnLoading.vue';
import CurrencyChangeForm from '@/components/CurrencyChangeForm.vue';
import CurrencyChangeInfo from '@/components/CurrencyChangeInfo.vue';
import ErrorMessageVue from '@/components/ErrorMessage.vue';
import Spinner from '@/components/Spinner.vue';
import { onMounted } from 'vue';
import { useCurrencyCountryPairs } from './composables/homeview/useCurrencyCountryPair';
import { useConversion } from './composables/homeview/useConversion';

const {
	fetchData: fetchCurrencies,
	currencyCountryPairs,
	loading,
	error,
} = useCurrencyCountryPairs();

const {
	fetchConversion,
	clearError,
	conversion,
	loading: conversionLoading,
	error: conversionError,
} = useConversion();

onMounted(fetchCurrencies);
</script>

<template>
	<ErrorMessageVue
		v-if="conversionError"
		:message="conversionError.message"
		@onClose="clearError"
	/>

	<BtnReload v-if="error" @onReload="fetchCurrencies" />
	<Spinner v-if="loading" />

	<div
		v-if="currencyCountryPairs.length"
		class="bg-white rounded-lg shadow-md p-6 mx-auto max-w-screen-lg mt-4"
	>
		<div :class="{ 'mb-5': conversion || conversionLoading }">
			<CurrencyChangeInfo
				:conversion="conversion"
				:loading="conversionLoading"
			/>
		</div>
		<CurrencyChangeForm
			@onSubmit="fetchConversion"
			:currencyCountryPairs="currencyCountryPairs"
		>
			<div class="mt-5 md:mt-2 md:mb-2">
				<BtnLoading type="submit" text="Cambio" :loading="conversionLoading">
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
