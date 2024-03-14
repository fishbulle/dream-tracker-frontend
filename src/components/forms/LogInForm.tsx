import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { logIn } from '../../api/api';
import { FormField } from './input/FormField';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../styles/styles';
import { messages } from '../../utils/messages';
import { ROUTES } from '../../routes/routes';

const schema = z.object({
  email: z
    .string()
    .min(5, messages.form.emailReq)
    .email({ message: messages.form.email }),
  password: z.string().min(1, messages.form.passwordReq),
});

type FormData = z.infer<typeof schema>;

export function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken, setUserId, setUsername } =
    useContext(AuthContext);

  async function onSubmit(data: FieldValues) {
    try {
      const response = await logIn(
        data.email,
        data.password,
        setIsAuthenticated,
        setToken,
        setUserId,
        setUsername
      );

      if (response?.status == 200) navigate(ROUTES.DASHBOARD);
      else setErrorMessage(messages.errors.incorrectCredentials);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className='my-3 my-md-5 px-4 text-start'
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && <div className='text-danger my-1'>{errorMessage}</div>}
      <FormField
        fieldName='email'
        label='email'
        inputType='email'
        fieldError={errors.email}
        customError={errorMessage}
        register={register}
      />
      <FormField
        fieldName='password'
        label='password'
        inputType='password'
        fieldError={errors.password}
        customError={errorMessage}
        register={register}
      />
      <StyledButton>enter the realm of dreams</StyledButton>
    </form>
  );
}
