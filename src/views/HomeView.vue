<script setup lang="ts">
import CurrencyChangeForm from '@/components/CurrencyChangeForm.vue';
import CurrencyChangeInfo from '@/components/CurrencyChangeInfo.vue';
import Spinner from '@/components/Spinner.vue';
import ErrorMessageVue from '@/components/ErrorMessage.vue';
import { onMounted } from 'vue';
import { useCurrenyStore } from '@/stores/currency-store';
import { useConvertStore } from '@/stores/convert-store';

const currencyStore = useCurrenyStore();
const convertStore = useConvertStore();

const fetchCurrencies = (): void => {
	if (!currencyStore.currencyList) {
		currencyStore.fetchCurrencies();
	}
};

onMounted(fetchCurrencies);
</script>

<template>
	<ErrorMessageVue
		v-if="convertStore.error"
		:message="convertStore.error"
		@onClose="convertStore.clearError"
	/>
	<Spinner v-if="currencyStore.loading" />

	<div
		v-if="currencyStore.currencyList"
		class="bg-white rounded-lg shadow-md p-6 mx-auto max-w-screen-lg mt-4"
	>
		<CurrencyChangeForm
			@onSubmit="convertStore.fetchCurrencyConversion"
			:currencyCountryPairs="currencyStore.currencyCountryPairs"
		>
			<div class="md:mt-2 md:mb-2">
				<button
					type="submit"
					class="bg-blue-500 text-white px-4 py-2 flex items-center justify-between space-x-2 rounded-md"
				>
					<span>Cambio</span>
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
				</button>
			</div>
		</CurrencyChangeForm>
		<CurrencyChangeInfo />
	</div>
</template>
