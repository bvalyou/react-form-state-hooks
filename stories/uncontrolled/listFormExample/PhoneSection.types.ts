import type { ListData, ListMerge } from 'react-form-state-hooks/uncontrolled';
import { PhoneNumber } from './FormWithList.types';

export interface PhoneSectionProps {
	name: string;
	initialData?: ListData<PhoneNumber>;
	merge: ListMerge;
}
