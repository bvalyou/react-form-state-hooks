import { createContext } from 'react';
import type { FormState } from '../useFormState.types';
import type { ListFormState } from '../useListFormState.types';

export default createContext<FormState | ListFormState | null>(null);