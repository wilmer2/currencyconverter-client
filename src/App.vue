<script setup lang="ts">
import Header from './components/Header.vue';
import Container from './components/Container.vue';
</script>

<template>
	<Header />
	<Container>
		<RouterView />
	</Container>
</template>
