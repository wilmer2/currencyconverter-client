<script setup lang="ts">
import { type Conversion } from '@/interfaces/conversion.interface';

const props = defineProps<{
	conversion: Conversion;
}>();
</script>

<template>
	<div class="mb-1 md:mb-2">
		<h2 class="text-lg font-semibold">Resultado:</h2>
	</div>
	<div>
		<div class="flex">
			<h4 class="text-md font-semibold text-gray-500">Cambio:</h4>
			<span class="text-gray-500 text-md ml-1">
				{{ props.conversion.query.amount }} {{ props.conversion.query.from }} =
				{{ props.conversion.result }} {{ props.conversion.query.to }}
			</span>
		</div>
		<div class="flex">
			<h4 class="text-md font-semibold text-gray-500">Tasa:</h4>
			<span class="text-gray-500 text-md ml-1">
				1.00 {{ props.conversion.query.from }} = {{ props.conversion.quote }}
				{{ props.conversion.query.to }}
			</span>
		</div>
	</div>
</template>
