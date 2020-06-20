/**
 * @module createOnChange
 */

/**
 * @callback onChange - Handles a change to a HTML form control
 * @param {React.ChangeEvent} event - The triggered DOM event
 */

/**
 * Creates an onChange callback for an HTML input which is bound to the updateData callback
 * @param {updateData} updateData - Handles a change to a field in the form state
 * @param {function} onChange - Pass-through of HTML event handler
 * @returns {onChange} Takes a change event and uses it to update the form state
 * @alias module:createOnChange
 */
const createOnChange = (updateData, onChange) => (event) => {
	const {
		target: { name, value, type, checked },
	} = event;

	onChange?.(event);

	if (type === 'radio' || type === 'checkbox') {
		updateData(name, checked ? value : false);
	} else {
		updateData(name, value);
	}
};

export default createOnChange;
