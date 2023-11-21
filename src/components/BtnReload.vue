<script setup lang="ts">
const emit = defineEmits<{
	(e: 'onReload'): void;
}>();
</script>

<template>
	<div class="flex justify-center items-center mt-20 md:mt-15">
		<div class="flex flex-col items-center">
			<h2 class="mb-3">Ocurrió un error, inténtalo de nuevo</h2>
			<button
				class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md flex items-center justify-between space-x-2"
				@click="$emit('onReload')"
			>
				<span> Cargar de nuevo </span>
				<svg
					class="text-white h-5 w-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 18"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<style scoped>
.btn-reload-container {
	min-height: 100vh;
	min-height: calc(calc(100vh - 80px) - 3.5rem);
	/* max-width: 500px;
	margin: 0 auto; */
}
</style>
