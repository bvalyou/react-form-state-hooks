import type { ChangeEvent, Merge } from './useFormState.types';
import type { ListMerge } from './list/useListFormState.types';
import type { OnChange } from './createOnChange.types';

/**
 * Creates an onChange callback for an HTML input which is bound to the updateData callback
 * @param {Merge} merge - Handles a change to a field in the form state
 * @param {OnChange} onChange - Pass-through of HTML event handler
 * @returns {OnChange} Takes a change event and uses it to update the form state
 */
const createOnChange = (merge: Merge | ListMerge, onChange?: OnChange) => (
	event: ChangeEvent
): void => {
	const {
		target: { name, value, type },
	} = event;

	onChange?.(event);

	if (type === 'radio' || type === 'checkbox') {
		const { checked } = event.target as HTMLInputElement;
		merge({ [name]: checked ? value || true : false });
	} else {
		merge({ [name]: value });
	}
};

export default createOnChange;
