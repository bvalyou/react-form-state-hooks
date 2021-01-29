import type { Merge } from 'react-form-state-hooks/uncontrolled/useFormState.types';
import type { PhoneNumber } from './BasicForm';

export interface PhoneSectionProps {
	name: string;
	initialData?: PhoneNumber;
	merge: Merge;
}
