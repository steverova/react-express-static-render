import { zodResolver } from '@hookform/resolvers/zod'
import { GalleryVerticalEnd } from 'lucide-react'
import type { JSX } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import InputField from '../form-inputs/input-field'

const signinFormSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'El correo es obligatorio')
		.email('Formato de correo inválido')
		.max(254, 'Correo demasiado largo'),

	password: z
		.string()
		.min(8, 'Mínimo 8 caracteres')
		.max(128, 'Contraseña demasiado larga')
		.regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
		.regex(/[a-z]/, 'Debe contener al menos una minúscula')
		.regex(/[0-9]/, 'Debe contener al menos un número')
		.regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo')
})

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>): JSX.Element {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'all',
		resolver: zodResolver(signinFormSchema)
	})

	console.log('errors', errors)

	const onSubmit = (data: z.infer<typeof signinFormSchema>): void => {
		console.log('Form Data:', data)
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<div className='flex flex-col items-center gap-2 text-center'>
						<Link
							className='flex flex-col items-center gap-2 font-medium'
							to='/'>
							<div className='flex size-8 items-center justify-center rounded-md'>
								<GalleryVerticalEnd className='size-6' />
							</div>
							<span className='sr-only'>Acme Inc.</span>
						</Link>
						<h1 className='text-xl font-bold'>Welcome to Acme Inc.</h1>
						<FieldDescription>
							Don&apos;t have an account? <Link to='/signup'>Sign up</Link>
						</FieldDescription>
					</div>
					<InputField
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
						key='email'
						labelText='Email'
						placeholder='john-doe@domain.com'
						required={true}
						type='email'
					/>

					<InputField
						{...register('password')}
						error={!!errors.password}
						helperText={errors.password?.message}
						key='password'
						labelText='Password'
						placeholder='Enter your password'
						required={true}
						type='password'
					/>
					<Field>
						<Button type='submit'>Login</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	)
}
