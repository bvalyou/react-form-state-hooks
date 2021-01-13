import { Data, UpdateData } from 'react-form-state-hooks/controlled/useFormState.types';
import { RemoveEntry } from 'react-form-state-hooks/semiControlled/useListFormState.types';

export interface PhoneEntryProps {
	name: string;
	data: Data;
	updateData: UpdateData;
	removeEntry: RemoveEntry;
}
