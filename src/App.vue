<script setup lang="ts">
import Header from './components/Header.vue';
import Container from './components/Container.vue';
import { onMounted } from 'vue';

onMounted(() => {
	console.log('*** load app ***');
});
</script>

<template>
	<Header />
	<Container>
		<RouterView />
	</Container>
</template>
