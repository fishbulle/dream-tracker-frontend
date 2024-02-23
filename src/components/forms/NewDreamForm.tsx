import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { z } from 'zod';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newDream } from '../../api/api';
import { FormField } from './FormField';
import { Button } from 'react-bootstrap';

const schema = z.object({
    title: z.string().min(1, 'Title is required.'),
    content: z.string().min(1, 'Content is required.'),
    category: z.string().min(1, 'Category is required.')
});

type FormData = z.infer<typeof schema>;

export function NewDream() {
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

                {/* <ReactTags
                    tags={tagValues}
                    delimiters={[ Keys.COMMA, Keys.SPACE ]}
                    handleAddition={handleTagChange}
                    placeholder="Enter tags separated by comma or space"
                /> */}

                <Button type="submit" className="btn w-100" aria-label='Submit button'>
          Register dream
                </Button>
            </form>
        </>
    );
}