import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { z } from 'zod';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newDream } from '../../api/api';
import { FormField } from './FormField';
import { StyledButton } from '../../styles/styles';

const schema = z.object({
    title: z.string().min(1, 'Title is required.'),
    content: z.string().min(1, 'Content is required.'),
    category: z.string().min(1, 'Category is required.'),
    type: z.enum(['NIGHTMARE', 'NOT_NIGHTMARE']),
});

type FormData = z.infer<typeof schema>;
type option = {
    value: string;
    label: string;
};

const dreamOptions: option[] = [
    { value: 'NIGHTMARE', label: 'yes' },
    { value: 'NOT_NIGHTMARE', label: 'no' },
];

export function NewDreamForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const { token, userId } = useContext(AuthContext);

    async function onSubmit(data: FieldValues) {
        try {
            await newDream({
                title: data.title,
                content: data.content,
                category: data.category,
                type: data.type,
                userId,
                token,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form className='text-start' onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName='title'
                    label='title'
                    inputType='text'
                    fieldError={errors.title}
                    register={register}
                />

                <label htmlFor='content' className='form-label fw-semibold'>
                    content
                    <div className='form-text'>what happened in the dream?</div>
                </label>
                <textarea
                    {...register('content')}
                    className={
                        errors.content
                            ? 'form-control is-invalid mb-3'
                            : 'form-control mb-3'
                    }
                    name='content'
                    id='content'
                    rows={4}
                />

                <FormField
                    fieldName='category'
                    label='category'
                    inputType='text'
                    labelDescription='sad, happy, cozy, funny, scary ..'
                    fieldError={errors.category}
                    register={register}
                />

                <FormField
                    fieldName='type'
                    label='type'
                    labelDescription='was it a nightmare?'
                    inputType='radio'
                    options={dreamOptions}
                    fieldError={errors.type}
                    register={register}
                />

                <StyledButton aria-label='Submit button'>
                    register dream
                </StyledButton>
            </form >
        </>
    );
}
