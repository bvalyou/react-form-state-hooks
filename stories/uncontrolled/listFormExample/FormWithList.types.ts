import { ListData } from 'react-form-state-hooks/uncontrolled';

export interface PhoneEntryData {
	countryCode: string;
	number: string;
}

export interface FormWithListData {
	firstName: string;
	lastName: string;
	phoneNumber: ListData<PhoneEntry>;
}
