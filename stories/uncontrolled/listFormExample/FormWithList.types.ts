import type { Data } from 'react-form-state-hooks/uncontrolled';
import type { ListData } from 'react-form-state-hooks/utils/listFormData.types';

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

export interface MyFormProps {
	service: (data: Data) => void;
}
