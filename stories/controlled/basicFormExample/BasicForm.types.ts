import type { UpdateData } from 'react-form-state-hooks/controlled';

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

export interface PhoneSectionProps {
	name: string;
	data?: PhoneNumber;
	updateData: UpdateData;
}

export interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: PhoneNumber;
}
