import { type StringKeyObject, type ErrorResponse } from './generics.interface';
import { type Ref, type UnwrapRef } from 'vue';

export interface FetchComposableData<T> {
	loading: Ref<boolean>;
	error: Ref<ErrorResponse | null>;
	data: Ref<UnwrapRef<T> | null>;
	fetchData: (params?: any, headers?: StringKeyObject) => Promise<void>;
}
