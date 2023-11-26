<script setup lang="ts">
import BtnLoading from '@/components/BtnLoading.vue';
import BtnReload from '@/components/BtnReload.vue';
import Spinner from '@/components/Spinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Form from '@/components/Form.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import type { FieldData } from '@/interfaces/generics.interface';
import type { UserRequestBody } from '@/interfaces/request-body.interface';
import type { UserCreatedResponse } from '@/interfaces/user.interface';
import { createUser } from '@/services/userService';
import { usePostClearError } from '@/composables/usePostClearError';
import { useLogin } from './composables/registerView/useLogin';
import { useGetLoggedUser } from './composables/registerView/useGetLoggedUser';
import { useUserStore } from '@/stores/useUserStore';

const {
	saveData: saveUser,
	data: successUserCreated,
	loading,
	error,
	clearError,
} = usePostClearError<UserCreatedResponse, UserRequestBody>(createUser);

const {
	data: loginData,
	loading: loginLoading,
	error: loginError,
	saveCredential,
	loginCheck,
} = useLogin(successUserCreated);

const {
	data: userData,
	loading: loadingUser,
	error: errorUser,
	fetchData: getUser,
} = useGetLoggedUser(loginData);

const router = useRouter();
const userStore = useUserStore();

const handleUserSave = (userCredentials: UserRequestBody): void => {
	saveCredential(userCredentials);
	saveUser(userCredentials);
};

const handleReload = (): void => {
	if (loginData.value) {
		getUser();
	} else {
		loginCheck();
	}
};

watch(userData, () => {
	if (userData.value?.user) {
		userStore.setUser(userData.value?.user);
	}
	router.push('/');
});

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
	<div class="w-full max-w-sm mx-auto mt-4">
		<Spinner v-if="loginLoading || loadingUser" />
		<BtnReload v-if="loginError || errorUser" @onReload="handleReload" />
	</div>
	<div
		v-if="!successUserCreated"
		class="w-full max-w-sm mx-auto rounded-lg bg-white shadow-md rounded pt-5 mt-4"
	>
		<h1 class="text-2xl text-gray-800 font-semibold dark:text-white mb-3 pl-8">
			Regitro
		</h1>
		<hr />
		<div class="pt-5 px-8 pb-8 mb-4">
			<Form
				@onSubmitData="handleUserSave"
				:fields="fields"
				:fieldErrors="error && error.fieldErrors"
				:isDisabled="loading"
			>
				<div class="flex items-center justify-center">
					<BtnLoading type="submit" text="Registrarse" :loading="loading" />
				</div>
			</Form>
		</div>
	</div>
</template>
