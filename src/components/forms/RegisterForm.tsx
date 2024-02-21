import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from '../../api/api';
import { FormField } from './FormField';
import { Button } from 'react-bootstrap';

const schema = z.object({
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().min(1, 'Last name is required.'),
    email: z.string().min(5).email('Please provide a valid email address.'),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
        .regex(/\d/, { message: 'Password must contain at least one digit [0-9].' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter [A-Z]' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter [a-z]' }),
    confirmPassword: z.string()
}).refine(value => value.password == value.confirmPassword, {
    message: 'Password doesn\'t match. Try again.',
    path: [ 'confirmPassword' ]
});

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function onSubmit(data: FieldValues) {
        try {
            await registerUser(
                data.firstName,
                data.lastName,
                data.email,
                data.password
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form className='my-3 my-md-5 px-4 text-start' onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName='firstName' 
                    label='First name' 
                    inputType='text' 
                    fieldError={errors.firstName} 
                    register={register} />
                <FormField
                    fieldName='lastName' 
                    label='Last name' 
                    inputType='text' 
                    fieldError={errors.lastName} 
                    register={register} />
                <FormField
                    fieldName='email' 
                    label='Email'
                    labelDescription='Will be used as your username.' 
                    inputType='email' 
                    fieldError={errors.email} 
                    register={register} />
                <FormField
                    fieldName='password' 
                    label='Password' 
                    // TODO make this a info button? Or make it show inside the input while typing
                    labelDescription='At least 8 characters with 1 number, 1 uppercase & 1 lowercase letter.'
                    inputType='password' 
                    fieldError={errors.password} 
                    register={register} />
                <FormField
                    fieldName='confirmPassword' 
                    label='Confirm password' 
                    inputType='password' 
                    fieldError={errors.confirmPassword} 
                    register={register} />
                <Button type="submit" className="btn w-100" aria-label='Register button'>
          Register
                </Button>
            </form>
        </>
    );
}