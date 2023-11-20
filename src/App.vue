<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Container from './components/Container.vue';
</script>

<template>
	<Header />
	<Container>
		<RouterView />
	</Container>
</template>
