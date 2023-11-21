<script setup lang="ts">
import Header from './components/Header.vue';
import Container from './components/Container.vue';
import { onMounted } from 'vue';
import { generateTrackGuestUserHeader } from './services/headerService';

onMounted(() => {
	generateTrackGuestUserHeader();
});
</script>

<template>
	<Header />
	<Container>
		<RouterView />
	</Container>
</template>
