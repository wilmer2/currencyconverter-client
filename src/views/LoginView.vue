<script setup lang="ts">
import BtnReload from '@/components/BtnReload.vue';
import BtnLoading from '@/components/BtnLoading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Form from '@/components/Form.vue';
import Spinner from '@/components/Spinner.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import type { FieldData } from '@/interfaces/generics.interface';
import type {
	LoginTokenResponse,
	UserResponse,
} from '@/interfaces/user.interface';
import type { UserRequestBody } from '@/interfaces/request-body.interface';
import { HEADERS_KEYS } from '@/utils/headers.enum';
import { setItem } from '@/utils/localStorageAdapter';
import { login, getUser } from '@/services/userService';
import { useUserStore } from '@/stores/useUserStore';
import { useFetch } from '@/composables/useFetch';
import { usePostClearError } from '@/composables/usePostClearError';

const {
	data: loginData,
	error,
	loading,
	clearError,
	saveData: loginCheck,
} = usePostClearError<LoginTokenResponse, UserRequestBody>(login);

const {
	data: userData,
	error: errorUser,
	loading: loadingUser,
	fetchData: getCurrentUser,
} = useFetch<UserResponse>(getUser);

const router = useRouter();
const userStore = useUserStore();

watch(loginData, () => {
	if (loginData.value) {
		setItem(HEADERS_KEYS.TOKEN_ID, JSON.stringify(loginData.value));
		getCurrentUser();
	}
});

watch(userData, () => {
	if (userData.value?.user) {
		userStore.setUser(userData.value?.user);
		router.push('/');
	}
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
		placeholder: 'Contraseña',
		label: 'Contraseña',
	},
];
</script>

<template>
	<div class="w-full max-w-sm mx-auto" v-if="error">
		<ErrorMessage :message="error.message" @onClose="clearError" />
	</div>
	<div class="w-full max-w-sm mx-auto mt-4">
		<Spinner v-if="loadingUser" />
		<BtnReload v-if="errorUser" @onReload="getCurrentUser" />
	</div>

	<div
		class="w-full max-w-sm mx-auto rounded-lg bg-white shadow-md rounded pt-5 mt-4"
		v-if="!loginData"
	>
		<h1 class="text-2xl text-gray-800 font-semibold dark:text-white mb-3 pl-8">
			Login
		</h1>
		<hr />
		<div class="pt-5 px-8 pb-8 mb-4">
			<Form @onSubmitData="loginCheck" :fields="fields">
				<div class="flex items-center justify-center">
					<BtnLoading type="submit" text="Iniciar sesión" :loading="loading" />
				</div>
			</Form>
		</div>
	</div>
</template>
