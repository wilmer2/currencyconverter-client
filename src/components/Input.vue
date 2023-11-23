<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { InputType } from '@/interfaces/generics.interface';

const props = defineProps<{
	label: string;
	placeholder?: string;
	name: string;
	type: InputType;
}>();

const emit = defineEmits<{
	(e: 'onChangeInputValue', name: string, value: string): void;
}>();

const inputValue: Ref<string> = ref<string>('');

const handleInput = () => {
	emit('onChangeInputValue', props.name, inputValue.value);
};
</script>

<template>
	<label class="block text-gray-700 text-sm font-bold mb-2" :for="props.name">
		{{ props.label }}
	</label>
	<input
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		:id="props.name"
		:type="props.type"
		:placeholder="props.placeholder"
		@input="handleInput"
		v-model="inputValue"
	/>
	<!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
		Contraseña
	</label>
	<input
		class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
		id="password"
		type="password"
		placeholder="******************"
	/>
	<p class="text-red-500 text-xs italic">Please choose a password.</p> -->
</template>
