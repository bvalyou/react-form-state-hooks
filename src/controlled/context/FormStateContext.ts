import { createContext } from 'react';
import type { ListFormState } from '../list/useListFormState.types';
import type { FormState } from '../useFormState.types';

const FormStateContext = createContext<FormState | ListFormState | null>(null);

export default FormStateContext;
