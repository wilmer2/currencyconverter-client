<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';

const emit = defineEmits<{
	(e: 'onLogout'): void;
}>();

const showMenu: Ref<boolean> = ref<boolean>(false);
const userStore = useUserStore();

const handleShowMenu = (): void => {
	showMenu.value = true;
};

const handleHideMenu = () => {
	showMenu.value = false;
};
</script>

<template>
	<div class="relative" v-click-outside="handleHideMenu" tabindex="0">
		<button
			id="dropdownDefaultButton"
			data-dropdown-toggle="dropdown"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			type="button"
			@click="handleShowMenu"
		>
			{{ userStore.user?.email }}
			<svg
				class="w-2.5 h-2.5 ms-3"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 10 6"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m1 1 4 4 4-4"
				/>
			</svg>
		</button>

		<div
			id="dropdown"
			class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
			v-show="showMenu"
		>
			<ul
				class="py-2 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownDefaultButton"
			>
				<li>
					<a
						href="#"
						class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						@click="$emit('onLogout')"
						>Cerrar sesión</a
					>
				</li>
			</ul>
		</div>
	</div>
</template>
