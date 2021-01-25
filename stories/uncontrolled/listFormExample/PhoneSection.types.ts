import type { Data, ListData, ListMerge } from 'react-form-state-hooks/uncontrolled';

export interface PhoneSectionProps {
	name: string;
	initialData: ListData<Data>;
	merge: ListMerge;
}
