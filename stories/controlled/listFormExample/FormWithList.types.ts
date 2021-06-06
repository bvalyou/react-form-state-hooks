import type { Data, UpdateData } from 'react-form-state-hooks/controlled/useFormState.types';
import type { RemoveEntry } from 'react-form-state-hooks/uncontrolled/list/useListFormState.types';
import type { ListData } from 'react-form-state-hooks/utils/listFormData.types';
import type { UpdateListData } from 'react-form-state-hooks/controlled';

export interface PhoneNumber {
	countryCode?: string;
	number?: string;
}

export interface PhoneSectionProps {
	name: string;
	data: ListData<PhoneNumber>;
	updateData: UpdateData;
}

export interface PhoneEntryProps {
	name: string;
	data: Data;
	updateData: UpdateListData<PhoneNumber>;
	removeEntry: RemoveEntry;
}

export interface MyFormData {
	firstName?: string;
	lastName?: string;
	isHuman?: boolean;
	phoneNumber?: PhoneNumber[];
}

export interface MyFormProps {
	service: (data: Data) => void;
}
