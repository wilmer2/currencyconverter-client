import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user.interface';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: null as null | User,
		};
	},
	actions: {
		setUser(userData: User | null): void {
			this.user = userData;
		},
	},
});
