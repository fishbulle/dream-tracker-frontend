import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { z } from 'zod';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newDream } from '../../api/api';
import { FormField } from './input/FormField';
import { StyledButton, StyledButtonWarning } from '../../styles/styles';
import { messages } from '../../utils/messages';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { dreamOptions } from '../../utils/dream-type-option';

const schema = z.object({
  title: z.string().min(1, messages.form.dream.title),
  content: z.string().min(1, messages.form.dream.content),
  category: z.string().min(1, messages.form.dream.category),
  type: z.enum(['NIGHTMARE', 'NOT_NIGHTMARE']),
});

type FormData = z.infer<typeof schema>;

export function NewDreamForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { token, userId } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(data: FieldValues) {
    try {
      const response = await newDream({
        title: data.title,
        content: data.content,
        category: data.category,
        type: data.type,
        userId,
        token,
      });

      if (response?.status == 200) navigate(ROUTES.ARCHIVE);
      else setErrorMessage(messages.errors.unknown);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className='text-start' onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <div className='text-danger my-1'>{errorMessage}</div>}

        <FormField
          fieldName='title'
          label='title'
          inputType='text'
          fieldError={errors.title}
          register={register}
        />

        <label htmlFor='content' className='form-label fw-semibold'>
          content
          <div className='form-text'>
            {messages.form.dream.contentDescription}
          </div>
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
          fieldError={errors.category}
          register={register}
        />

        <FormField
          fieldName='type'
          label='type'
          labelDescription={messages.form.dream.nightmare}
          inputType='radio'
          options={dreamOptions}
          fieldError={errors.type}
          register={register}
        />

        <StyledButton aria-label='Submit button'>register dream</StyledButton>
        <StyledButtonWarning
          aria-label='Cancel button'
          onClick={() => navigate(ROUTES.ARCHIVE)}
        >
          cancel
        </StyledButtonWarning>
      </form>
    </>
  );
}
