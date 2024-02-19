import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

type option = {
    value: string,
    label: string
};

interface IFormField<T extends FieldValues> {
    fieldError: FieldError | undefined;
    customError?: string | null;
    register: UseFormRegister<T>;
    label: string;
    fieldName: string;
    inputType: HTMLInputTypeAttribute;
    options?: option[] | null;
    labelDescription?: string;
    placeholder?: string
    value?: string
    defaultValue?: string
    checked?: boolean
    min?: string
    radioLabel?: string
}

export function FormField<T extends FieldValues>({
  fieldError,
  customError,
  register,
  label,
  fieldName,
  inputType,
  labelDescription,
  placeholder,
  defaultValue,
  min
}: IFormField<T>) {
    
  return (
    <>
      <div className="mb-3">
        <label htmlFor={fieldName} className="form-label fw-semibold">
          {label}
          <div className="form-text">
            {labelDescription}
          </div>
        </label>
        {
          fieldError && 
          <div className="text-danger my-1">
            {fieldError.message}
          </div>
        }
        {
          <input
            {...register(fieldName as Path<T>)}
            type={inputType}
            min={min}
            className={fieldError || customError != undefined ? 'form-control is-invalid' : 'form-control border-dark-purple'}
            id={fieldName}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        }
      </div>
    </>
  );
}