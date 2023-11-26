<script setup lang="ts">
import { reactive } from 'vue';
import type { FieldData } from '@/interfaces/generics.interface';
import Input from './Input.vue';

const props = defineProps<{
	fields: FieldData[];
	fieldErrors?: { [key: string]: string[] } | null;
	isDisabled?: boolean;
}>();

const emit = defineEmits<{
	(e: 'onSubmitData', data: any): void;
}>();

const getIntialData = (): { [key: string]: string } => {
	return props.fields.reduce((objData, fieldData) => {
		return {
			...objData,
			[fieldData.name]: '',
		};
	}, {});
};

const formData = reactive(getIntialData());

const handleChangeValue = (name: string, value: string): void => {
	formData[name] = value;
};

const handleSubmit = (): void => {
	emit('onSubmitData', formData);
};
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<div v-for="field in props.fields" class="mb-4" :key="field.name">
			<Input
				:label="field.label"
				:name="field.name"
				:placeholder="field.placeholder"
				:type="field.type"
				:disabled="props.isDisabled"
				:fieldErrors="props.fieldErrors"
				@onChangeInputValue="handleChangeValue"
			/>
		</div>

		<slot></slot>
	</form>
</template>
