import { FormStateAction, FormStateActionType, InternalFormState } from './useFormState.types';

/**
 * Derives the next state using an action
 * @param {InternalFormState} prevState - The previous data for the form
 * @param {FormStateAction} action - Used to derive the next state
 * @returns {InternalFormState} - The new data
 * @private
 */
export function reducer(prevState: InternalFormState, action: FormStateAction): InternalFormState {
	switch (action.type) {
		case FormStateActionType.Update: {
			if (!action.name) {
				throw new Error('action.name is required for action type update');
			}

			return {
				cause: action.type,
				data: {
					...prevState.data,
					[action.name]: action.value,
				},
			};
		}
		case FormStateActionType.Reset: {
			if (!action.data) {
				throw new Error('action.data is required for action type reset');
			}

			return {
				data: action.data,
				cause: action.type,
			};
		}
		default: {
			throw new Error('Unsupported action type');
		}
	}
}
