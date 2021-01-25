import type { UpdateData } from 'react-form-state-hooks/controlled/useFormState.types';

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

export interface PhoneSectionProps {
	name: string;
	data?: PhoneNumber;
	updateData: UpdateData;
}
