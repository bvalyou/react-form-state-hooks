import { createContext } from 'react';
import type { FormState } from '../useFormState.types';
import type { ListFormState } from '../list/useListFormState.types';

const FormStateContext = createContext<FormState | ListFormState | null>(null);

export default FormStateContext;
