import { AxiosError } from 'axios';
import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';
import isNumber from 'lodash.isnumber';

import { HTTP_STATUS_CODE } from '@/utils/statusCode.enum.';
import { CUSTOM_MESSAGE } from '@/utils/customMessage.enum';
import {
	type GenericDataError,
	type ErrorResponse,
} from '@/interfaces/generics.interface';

const getStatusCode = (axiosError: AxiosError): number => {
	const { status = null, response = null } = axiosError;

	return status || response?.status || HTTP_STATUS_CODE.ERROR_INTERNAL;
};

const getMessage = (statusCode: number, axiosError: AxiosError): string => {
	const data = axiosError?.response?.data as GenericDataError;
	let errorMessage = '';

	if (statusCode >= HTTP_STATUS_CODE.ERROR_INTERNAL) {
		errorMessage = CUSTOM_MESSAGE.ERROR_INTERNAL_MESSAGE;
	} else if (statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
		errorMessage = CUSTOM_MESSAGE.NOT_FOUND;
	} else {
		errorMessage = data?.detail || axiosError?.message || '';
	}

	return errorMessage;
};

const getErrors = (
	axiosError: AxiosError
): { [key: string]: string[] } | null => {
	const data = axiosError?.response?.data as GenericDataError;

	if (!data?.errors) return null;

	return data.errors;
};

export const mapErrors = (axiosError: AxiosError): ErrorResponse => {
	const status = getStatusCode(axiosError);
	const message = getMessage(status, axiosError);
	const fieldErrors = getErrors(axiosError);

	return {
		status,
		message,
		fieldErrors,
	};
};

export const isErrorResponse = (e: any): e is ErrorResponse => {
	if (Array.isArray(e) || !isObject(e)) return false;

	const { message = null, status = null } = e as ErrorResponse;

	return isNumber(status) && isString(message);
};
