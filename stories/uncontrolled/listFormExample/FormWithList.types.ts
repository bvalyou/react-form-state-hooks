import { Data } from 'react-form-state-hooks/uncontrolled';
import { ListData } from 'react-form-state-hooks/utils/listFormData.types';

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
