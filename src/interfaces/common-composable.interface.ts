import { type StringKeyObject, type ErrorResponse } from './generics.interface';
import { type Ref, type UnwrapRef } from 'vue';

export interface FetchComposableData<T, R> {
	loading: Ref<boolean>;
	error: Ref<ErrorResponse | null>;
	data: Ref<UnwrapRef<T> | null>;
	fetchData: (params?: R, headers?: StringKeyObject) => Promise<void>;
}
