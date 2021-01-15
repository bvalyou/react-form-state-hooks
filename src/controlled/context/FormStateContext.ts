import { createContext } from 'react';
import type { ListFormState } from '../list/useListFormState.types';
import type { FormState } from '../useFormState.types';

export default createContext<FormState | ListFormState | null>(null);
