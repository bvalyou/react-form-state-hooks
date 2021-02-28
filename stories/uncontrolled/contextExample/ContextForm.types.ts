export interface PhoneEntryProps {
	name: string;
}

export interface PhoneSectionProps {
	name: string;
}

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

export interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: PhoneNumber[];
}
