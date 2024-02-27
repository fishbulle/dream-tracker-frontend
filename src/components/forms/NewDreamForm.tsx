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
    type: z.enum([ 'NIGHTMARE', 'NOT_NIGHTMARE' ])
});

type FormData = z.infer<typeof schema>;
type option = {
    value: string,
    label: string
};

const dreamOptions: option[] = [
    { value: 'NIGHTMARE', label: 'nightmare' },
    { value: 'NOT_NIGHTMARE', label: 'not nightmare' }
];

export function NewDreamForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const { token, userId } = useContext(AuthContext);
    
    async function onSubmit(data: FieldValues) {
        try {
            await newDream(
                { 
                    title:  data.title,
                    content: data.content,
                    category: data.category,
                    type: data.type,
                    userId,
                    token, 
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName='title'
                    label='Title'
                    inputType='text'
                    fieldError={errors.title}
                    register={register} />

                <FormField
                    fieldName='content'
                    label='Content'
                    inputType='text'
                    fieldError={errors.content}
                    register={register} />

                <FormField
                    fieldName='category'
                    label='Category'
                    inputType='text'
                    fieldError={errors.category}
                    register={register} />

                <FormField
                    fieldName='type'
                    label='Type'
                    labelDescription='was it a nightmare?'
                    inputType='radio'
                    options={dreamOptions}
                    fieldError={errors.type}
                    register={register}
                />

                <StyledButton aria-label='Submit button'>
          register dream
                </StyledButton>
            </form>
        </>
    );
}