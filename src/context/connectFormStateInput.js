import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
import createOnChange from '../utils/createOnChange';
import FormStateContext from './FormStateContext';

/**
 * @module connectFormStateInput
 */

/**
 * @typedef InputComponent - A component that will receive input props
 * @type {string|InputComponentFunc}
 */

/**
 * @callback InputComponentFunc - A component function
 * @param {Object} props - Standard React props
 * @param {string} props.name - HTML input name - used to link to the context
 * @param {function} props.onChange - HTML input change handler
 * @param {string} [props.type] - HTML input type - used for checkbox/radio detection
 * @param {string} [props.value] - HTML input value from the context
 * @param {boolean} [props.checked] - HTML input checked attribute for checkbox/radio
 */

/**
 * Connects a form control to the FormStateContext
 * @param {InputComponent} InputComponent - A React input or component matching the input API
 * @param {React.Context} [Context = FormStateContext] - A React context that will contain formState
 * @returns {function} The component with the InputComponent props applied
 * @alias module:connectFormStateInput
 */
function connectFormStateInput(InputComponent, Context = FormStateContext) {
	function ConnectedInput(props) {
		const formState = useContext(Context);
		const updateData = formState?.updateData;

		const onChange = useCallback(
			updateData ? createOnChange(formState.updateData, props.onChange) : props.onChange,
			[updateData, props.onChange]
		);

		const value = (formState?.mappedData || formState?.data)?.[props.name] || '';
		const stateProps = formState
			? props.type === 'checkbox' || props.type === 'radio'
				? {
						checked: Boolean(value),
				  }
				: { value }
			: {};

		return <InputComponent {...props} onChange={onChange} {...stateProps} />;
	}

	ConnectedInput.propTypes = {
		name: PropTypes.string.isRequired,
		type: PropTypes.string,
		onChange: PropTypes.func,
	};
	ConnectedInput.defaultProps = {
		type: undefined,
		onChange: undefined,
	};

	return ConnectedInput;
}

export default connectFormStateInput;
