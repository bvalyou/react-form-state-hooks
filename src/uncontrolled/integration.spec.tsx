import FormWithList from '../../stories/uncontrolled/listFormExample/FormWithList';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

test('controlled form without context', () => {
	const service = jest.fn();
	const { getByLabelText, getByText } = render(<FormWithList service={service} />);

	fireEvent.change(getByLabelText('First Name'), { target: { value: 'foo' } });
	fireEvent.change(getByLabelText('Last Name'), { target: { value: 'bar' } });
	fireEvent.click(getByLabelText('Are you a human?'));

	fireEvent.click(getByText('+'));

	fireEvent.change(
		getByLabelText('Country Code').parentElement?.querySelector('input') as HTMLInputElement,
		{
			target: { value: 'US +1' },
		}
	);
	fireEvent.change(getByLabelText('Number'), { target: { value: '12345' } });

	fireEvent.click(getByText('Send it!'));

	expect(service).toHaveBeenCalledWith({
		firstName: 'foo',
		lastName: 'bar',
		isHuman: true,
		phoneNumber: [
			{
				countryCode: 'US +1',
				number: '12345',
			},
		],
	});
});
