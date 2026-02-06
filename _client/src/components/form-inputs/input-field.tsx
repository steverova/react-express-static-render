import { type JSX, useId } from 'react'
import { Field, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type InputFieldProps = React.ComponentProps<'input'> & {
  required?: boolean
	placeholder?: string
	error?: boolean
	key: string
	labelText?: string
	name?: string
	type?: 'email' | 'password' | 'text' | 'number' | 'tel' | 'url' | 'search'
	helperText?: string | null | undefined
}

export default function InputField({
	required = false,
	helperText,
	error,
	key,
	labelText,
	type = 'text',
	placeholder = '',
	...props
}: InputFieldProps): JSX.Element {
	const id = useId()
	return (
		<Field>
			<FieldLabel htmlFor={`${id}-${key}`}>
				{labelText}
				{required ? ' *' : ''}
			</FieldLabel>
			<Input
				error={error}
				id={`${id}-${key}`}
				placeholder={`${placeholder} ${required ? '*' : ''}`}
				type={type}
				{...props}
			/>
			<small className={error ? 'text-destructive' : ''}>{helperText}</small>
		</Field>
	)
}