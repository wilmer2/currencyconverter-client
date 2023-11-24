<script setup lang="ts">
import type { FieldData } from '@/interfaces/generics.interface';
import BtnLoading from '@/components/BtnLoading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Form from '@/components/Form.vue';
import { createUser } from '@/services/userService';
import { usePostClearError } from '@/composables/usePostClearError';

const { data, loading, error, saveData, clearError } =
	usePostClearError(createUser);

const fields: FieldData[] = [
	{
		name: 'email',
		type: 'email',
		placeholder: 'Correo',
		label: 'Correo',
	},
	{
		name: 'password',
		type: 'password',
		placeholder: '*******',
		label: 'Contraseña',
	},
];
</script>

<template>
	<div class="w-full max-w-sm mx-auto" v-if="error && !error.fieldErrors">
		<ErrorMessage :message="error.message" @onClose="clearError" />
	</div>
	<div
		class="w-full max-w-sm mx-auto rounded-lg bg-white shadow-md rounded pt-5 mt-4"
	>
		<h1 class="text-2xl text-gray-800 font-semibold dark:text-white mb-3 pl-8">
			Regitro
		</h1>
		<hr />
		<div class="pt-5 px-8 pb-8 mb-4">
			<Form
				@onSubmitData="saveData"
				:fields="fields"
				:fieldErrors="error && error.fieldErrors"
			>
				<div class="flex items-center justify-center">
					<BtnLoading type="submit" text="Registrarse" :loading="loading" />
				</div>
			</Form>
		</div>
	</div>
</template>
