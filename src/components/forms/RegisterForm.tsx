import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from '../../api/api';
import { FormField } from './FormField';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { StyledButton } from '../../styles/styles';
import { messages } from '../../utils/messages';
import { ROUTES } from '../../routes/routes';

const schema = z
  .object({
    nickname: z.string().min(2),
    email: z.string().min(5).email(messages.form.email),
    password: z
      .string()
      .min(8, { message: messages.form.passwordRules.min })
      .regex(/\d/, { message: messages.form.passwordRules.digit })
      .regex(/[A-Z]/, { message: messages.form.passwordRules.uppercase }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password == value.confirmPassword, {
    message: messages.form.passwordMismatch,
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigate();

  async function onSubmit(data: FieldValues) {
    try {
      const response = await registerUser(
        data.nickname,
        data.email,
        data.password
      );

      if (response?.status == 200) navigation(ROUTES.LOGIN);
      else setErrorMessage(messages.errors.accountAlreadyExists);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form
        className='my-5 my-md-5 px-4 text-start'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          fieldName='nickname'
          label='nickname'
          labelDescription='this is what we will call you'
          inputType='text'
          fieldError={errors.nickname}
          register={register}
        />
        <FormField
          fieldName='email'
          label='email'
          labelDescription='this is what you will log in with'
          inputType='email'
          fieldError={errors.email}
          register={register}
        />
        <FormField
          fieldName='password'
          label='password'
          labelDescription='at least 8 characters with 1 number & 1 uppercase letter'
          inputType='password'
          fieldError={errors.password}
          register={register}
        />
        <FormField
          fieldName='confirmPassword'
          label='confirm password'
          labelDescription='enter the password again please'
          inputType='password'
          fieldError={errors.confirmPassword}
          register={register}
        />
        {errorMessage && <div className='text-danger my-1'>{errorMessage}</div>}
        <StyledButton type='submit' aria-label='Register button'>
          register
        </StyledButton>
      </form>
    </>
  );
}
