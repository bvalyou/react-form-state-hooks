import type { Data } from 'react-form-state-hooks/uncontrolled';
import type { ListData } from 'react-form-state-hooks/utils/listFormData.types';
import type { ListMerge, RemoveEntry } from 'react-form-state-hooks/uncontrolled';

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

export interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: ListData<PhoneNumber>;
}

export interface PhoneEntryProps {
	name: string;
	initialValue: PhoneNumber;
	merge: ListMerge<PhoneNumber>;
	removeEntry: RemoveEntry;
}

export interface PhoneSectionProps {
	name: string;
	initialData?: ListData<PhoneNumber>;
	merge: ListMerge;
}

export interface MyFormProps {
	service: (data: Data) => void;
}
