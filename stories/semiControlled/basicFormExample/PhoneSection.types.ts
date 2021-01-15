import type { Data, Merge } from 'react-form-state-hooks/semiControlled/useFormState.types';

export interface PhoneSectionProps {
	name: string;
	initialData: Data;
	merge: Merge;
}
