<script setup lang="ts">
import { type CurrencyCountryPair } from '@/interfaces/currency.interface';
import { type ConversionQueryData } from '@/interfaces/conversion.interface';
import { reactive } from 'vue';

const props = defineProps<{
	currencyCountryPairs: CurrencyCountryPair[];
}>();

const emit = defineEmits<{
	(e: 'onSubmit', data: ConversionQueryData): void;
}>();

const fields = reactive({
	amount: 100,
	from: props.currencyCountryPairs[0].currency,
	to: props.currencyCountryPairs[1].currency,
});

const handleSubmit = (): void => {
	emit('onSubmit', { ...fields });
};
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<div class="flex flex-col md:flex-row">
			<div class="w-full mr-2 mb-4 md:mb-1">
				<label for="amount" class="block mb-1 font-semibold text-black"
					>Importe</label
				>
				<input
					v-model="fields.amount"
					type="number"
					id="amount"
					required
					placeholder="Ingrese monto"
					name="amount"
					class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div class="w-full mr-2 mb-4 md:mb-1">
				<label for="from" class="block mb-1 font-semibold text-black"
					>De:</label
				>
				<select
					required
					id="from"
					name="from"
					class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					v-model="fields.from"
				>
					<option
						v-for="currencyCountry in props.currencyCountryPairs"
						:key="currencyCountry.currency"
						:value="currencyCountry.currency"
					>
						{{ currencyCountry.currency }} - {{ currencyCountry.country }}
					</option>
				</select>
			</div>
			<div class="w-full">
				<label for="to" class="block mb-1 font-semibold text-black">a</label>
				<select
					id="to"
					name="to"
					class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
					v-model="fields.to"
				>
					<option
						v-for="currencyCountry in props.currencyCountryPairs"
						:key="currencyCountry.country"
						:value="currencyCountry.currency"
					>
						{{ currencyCountry.currency }} - {{ currencyCountry.country }}
					</option>
				</select>
			</div>
		</div>
		<slot></slot>
	</form>
</template>
