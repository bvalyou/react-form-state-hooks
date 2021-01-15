import type { Data, Merge, RemoveEntry } from 'react-form-state-hooks/semiControlled';

export interface PhoneEntryProps {
	name: string;
	initialValue: Data;
	merge: Merge;
	removeEntry: RemoveEntry;
}
