<script setup lang="ts"></script>

<template>
	<div class="mx-auto max-w-[1280px] px-4 py-5 bg-gray-200 currency-container">
		<slot></slot>
	</div>
</template>

<style scoped>
.currency-container {
	min-height: calc(100vh - 80px);
}
</style>
