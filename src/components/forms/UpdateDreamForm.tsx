import { useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateDream } from '../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledButton, StyledWrapper } from '../../styles/styles';
import { FormField } from './FormField';

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

export function UpdateDreamForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const { token, userId } = useContext(AuthContext);
    const { state } = useLocation();
    const { dream } = state || {};
    const navigate = useNavigate();

    async function onSubmit(data: FieldValues) {
        try {
            await updateDream({
                title: data.title,
                content: data.content,
                category: data.category,
                type: data.type,
                userId,
                token,
                dreamId: dream.dreamId,
            }).then(() => navigate('/archive'));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <StyledWrapper>
            <form className='text-start' onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName='title'
                    label='title'
                    inputType='text'
                    defaultValue={dream.title}
                    fieldError={errors.title}
                    register={register}
                />

                {/* <FormField
                    fieldName='content'
                    label='content'
                    inputType='text'
                    defaultValue={dream.content}
                    fieldError={errors.content}
                    register={register} /> */}

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
                    defaultValue={dream.content}
                    id='content'
                    rows={4}
                />

                <FormField
                    fieldName='category'
                    label='category'
                    inputType='text'
                    defaultValue={dream.category}
                    fieldError={errors.category}
                    register={register}
                />

                <FormField
                    fieldName='type'
                    label='type'
                    labelDescription='was it a nightmare?'
                    inputType='radio'
                    options={dreamOptions}
                    checked={dream.type}
                    fieldError={errors.type}
                    register={register}
                />

                <StyledButton aria-label='Submit button'>
                    update dream
                </StyledButton>
            </form >
        </StyledWrapper >
    );
}
