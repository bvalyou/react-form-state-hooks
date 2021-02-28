import { createContext, useContext } from 'react';
import type { ListFormState } from '../list/useListFormState.types';
import type { FormState } from '../useFormState.types';

const FormStateContext = createContext<FormState | ListFormState | null>(null);

export const useFormStateContext = <T = unknown>(): FormState<T> =>
	(useContext(FormStateContext) as unknown) as FormState<T>;

export const useListFormStateContext = <T = unknown>(): ListFormState<T> =>
	(useContext(FormStateContext) as unknown) as ListFormState<T>;

export default FormStateContext;
