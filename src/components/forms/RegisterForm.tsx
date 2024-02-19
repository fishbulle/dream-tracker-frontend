import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from '../../api';
import { useState } from 'react';

const schema = z.object({
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().min(1, 'Last name is required.'),
    email: z.string().min(5).email('Please provide a valid email address.'),
    password: z.string().min(8, {message: "Password must be at least 8 characters."})
    .regex(/\d/, {message: "Password must contain at least one digit [0-9]."})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter [A-Z]"})
    .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter [a-z]"}),
    confirmPassword: z.string()
}).refine(value => value.password == value.confirmPassword, {
    message: "Password doesn't match. Try again.",
    path: ["confirmPassword"]
});

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const {formData} = useFormContext();
    const [username, setUsername] = useState<string>("");

    async function onSubmit(data: FieldValues) {
        try {
            const response = await registerUser(
                formData.firstName,
                formData.lastName,
                data.email,
                data.password
            );

            if (response == 200 || response == 201) {
                setUsername(data.email);
            } else {
                // method for handling user already exists
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        // form
        </>
    )
}