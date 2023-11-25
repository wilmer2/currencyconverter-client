<script setup lang="ts">
import BtnReload from './components/BtnReload.vue';
import Container from './components/Container.vue';
import Header from './components/Header.vue';
import Spinner from './components/Spinner.vue';

import { onMounted, watch } from 'vue';
import { generateTrackGuestUserHeader } from './services/headerService';
import { useUserStore } from './stores/useUserStore';
import { useConfigInitialData } from '@/composables/useConfigInitialData';

const { data, loading, error, fetchUserData } = useConfigInitialData();
const userStore = useUserStore();

onMounted(() => {
	generateTrackGuestUserHeader();
});

watch(data, () => {
	if (data.value?.user) {
		userStore.setUser(data.value.user);
	}
});
</script>

<template>
	<template v-if="error || loading">
		<div class="h-screen mx-auto max-w-[1280px] px-4 py-5 bg-gray-200">
			<Spinner v-if="loading" />
			<BtnReload v-if="error" @onReload="fetchUserData" />
		</div>
	</template>
	<template v-else>
		<Header />
		<Container>
			<RouterView />
		</Container>
	</template>
</template>
