<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { InputType } from '@/interfaces/generics.interface';

const props = defineProps<{
	label: string;
	placeholder?: string;
	name: string;
	type: InputType;
	fieldErrors?: { [key: string]: string[] } | null;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	(e: 'onChangeInputValue', name: string, value: string): void;
}>();

const inputValue: Ref<string> = ref<string>('');
const errors: Ref<string[]> = ref<string[]>([]);

watch(
	() => props.fieldErrors,
	() => {
		if (props.fieldErrors && props.fieldErrors[props.name]) {
			errors.value = props.fieldErrors[props.name];
		} else {
			errors.value = [];
		}
	}
);

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
		:class="{ 'border-red-500': errors.length }"
		:id="props.name"
		:type="props.type"
		:placeholder="props.placeholder"
		:disabled="props.disabled"
		@input="handleInput"
		v-model="inputValue"
		required
	/>
	<p class="text-red-500 text-xs italic" v-for="error in errors" :key="error">
		{{ error }}
	</p>
</template>
