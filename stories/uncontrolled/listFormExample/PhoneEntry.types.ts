import type { Data, ListMerge, RemoveEntry } from 'react-form-state-hooks/uncontrolled';

export interface PhoneEntryProps {
	name: string;
	initialValue: Data;
	merge: ListMerge;
	removeEntry: RemoveEntry;
}
