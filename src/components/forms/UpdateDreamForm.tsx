import { useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateDream } from '../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledButton, StyledWrapper } from '../../styles/styles';
import { FormField } from './FormField';
import { messages } from '../../utils/messages';
import { ROUTES } from '../../routes/routes';

const schema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  type: z.enum(['NIGHTMARE', 'NOT_NIGHTMARE']),
});

type FormData = z.infer<typeof schema>;

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(data: FieldValues) {
    try {
      const response = await updateDream({
        title: data.title,
        content: data.content,
        category: data.category,
        type: data.type,
        userId,
        token,
        dreamId: dream.dreamId,
      });

      if (response?.status == 200) navigate(ROUTES.ARCHIVE);
      else setErrorMessage(messages.errors.unknown);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledWrapper>
      <form className='text-start' onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <div className='text-danger my-1'>{errorMessage}</div>}
        <FormField
          fieldName='title'
          label='title'
          inputType='text'
          defaultValue={dream.title}
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

        <StyledButton aria-label='Submit button'>update dream</StyledButton>
      </form>
    </StyledWrapper>
  );
}
