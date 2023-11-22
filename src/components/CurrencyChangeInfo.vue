<script setup lang="ts">
import { type Conversion } from '@/interfaces/conversion.interface';

const props = defineProps<{
	conversion: Conversion | null;
	loading: boolean;
}>();
</script>

<template>
	<div
		role="status"
		class="max-w-sm animate-pulse height-box"
		v-if="props.loading"
	>
		<div
			class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-2 mb-5"
		></div>
		<div
			class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px] mb-3"
		></div>
		<div
			class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px]"
		></div>

		<span class="sr-only">Loading...</span>
	</div>
	<div v-else-if="props.conversion">
		<div class="mb-1 md:mb-2">
			<h2 class="text-lg font-semibold">Resultado:</h2>
		</div>
		<div>
			<div class="flex">
				<h4 class="text-md font-semibold text-gray-500">Cambio:</h4>
				<span class="text-gray-500 text-md ml-1">
					{{ props.conversion.query.amount }}
					{{ props.conversion.query.from }} = {{ props.conversion.result }}
					{{ props.conversion.query.to }}
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
	</div>
</template>

<style scoped>
.height-box {
	min-height: 84px;
}
</style>
