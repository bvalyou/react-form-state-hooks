import type { Data, ListData, Merge } from 'react-form-state-hooks/semiControlled';

export interface PhoneSectionProps {
	name: string;
	initialData: ListData<Data>;
	merge: Merge;
}
