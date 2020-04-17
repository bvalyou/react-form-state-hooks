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
 * @returns {onChange} Takes a change event and uses it to update the form state
 * @alias module:createOnChange
 */
const createOnChange = (updateData) => ({ target: { name, value, type, checked } }) => {
	if (type === 'radio' || type === 'checkbox') {
		updateData(name, checked ? value : false);
	} else {
		updateData(name, value);
	}
};

export default createOnChange;
