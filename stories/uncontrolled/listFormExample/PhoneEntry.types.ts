import type { ListMerge, RemoveEntry } from 'react-form-state-hooks/uncontrolled';
import { PhoneNumber } from './FormWithList.types';

export interface PhoneEntryProps {
	name: string;
	initialValue: PhoneNumber;
	merge: ListMerge<PhoneNumber>;
	removeEntry: RemoveEntry;
}
