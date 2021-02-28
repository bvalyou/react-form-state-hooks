import type { Merge } from 'react-form-state-hooks/uncontrolled';

export interface PhoneSectionProps {
	name: string;
	initialData?: PhoneNumber;
	merge: Merge;
}

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

export interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: PhoneNumber;
}
