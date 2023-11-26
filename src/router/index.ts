import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import { getToken } from '@/services/headerService';

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/register',
			name: 'register',
			meta: { guest: true },
			component: RegisterView,
		},
		{
			path: '/login',
			name: 'login',
			meta: { guest: true },
			component: LoginView,
		},
	],
});

router.beforeResolve(async (to) => {
	const token = getToken();

	if (to.meta?.guest && token) {
		return { name: 'home' };
	}
});
