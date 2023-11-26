import { uuid } from 'vue-uuid';
import { HEADERS_KEYS } from '../utils/headers.enum';
import localStorageAdapter from '../utils/localStorageAdapter';
import { type StringKeyObject } from '../interfaces/generics.interface';
import type { LoginTokenResponse } from '@/interfaces/user.interface';

export const generateTrackGuestUserHeader = (): void => {
	const guestUserHeader = localStorageAdapter.getItem(HEADERS_KEYS.X_GUEST_ID);

	if (!guestUserHeader) {
		const customHeader = { [HEADERS_KEYS.X_GUEST_ID]: uuid.v4() };

		localStorageAdapter.setItem(
			HEADERS_KEYS.X_GUEST_ID,
			JSON.stringify(customHeader)
		);
	}
};

export const getTrackGuestHeader = (): undefined | StringKeyObject => {
	const guestUserHeader = localStorageAdapter.getItem<StringKeyObject>(
		HEADERS_KEYS.X_GUEST_ID
	);

	return guestUserHeader === null ? undefined : guestUserHeader;
};

export const getToken = (): null | LoginTokenResponse => {
	const tokenData = localStorageAdapter.getItem<LoginTokenResponse>(
		HEADERS_KEYS.TOKEN_ID
	);

	return tokenData;
};

export default {
	generateTrackGuestUserHeader,
	getTrackGuestHeader,
	getToken,
};
