import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { logIn } from '../../api';
import { FormField } from './FormField';
import { Button } from 'react-bootstrap';

const schema = z.object({
  email: z
    .string()
    .min(5, 'Email is required.')
    .email({ message: 'Please provide a valid email address.' }),
  password: z
    .string()
    .min(1, 'Password is required.'),
});

type FormData = z.infer<typeof schema>;

export function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  //   const navigation = useNavigate();
  const { setIsAuthenticated,
    setToken,
    setUserId,
    setUsername
  } = useContext(AuthContext);

  function onSubmit(data: FieldValues) {
    logIn(
      data.email,
      data.password, 
      setIsAuthenticated, 
      setToken,
      setUserId,
      setUsername).then(response => {
      if (response?.status == 200) {
        console.log('yiiihaw');
      } else {
        setErrorMessage('Email or password are incorrect!');
      }
    }).catch(error => console.error(error.message));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <div className="text-danger my-1">{errorMessage}</div>}
      <FormField
        fieldName="email"
        label="Email"
        inputType="email"
        fieldError={errors.email}
        customError={errorMessage}
        register={register}
      />
      <FormField
        fieldName="password"
        label="Password"
        inputType="password"
        fieldError={errors.password}
        customError={errorMessage}
        register={register}
      />
      <Button type="submit" className="btn w-100">Sign in</Button>
    </form>
  );
}
