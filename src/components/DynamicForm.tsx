"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formConfig } from '../config/formConfig';
import { createSchema } from '../utils/createSchema';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

type FormValues = Record<string, any>;

const DynamicForm: React.FC = () => {
    const schema = createSchema();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        console.log('Form Data:', data);
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="400px" mx="auto" p="4" boxShadow="md" borderRadius="md">
            {formConfig.map((field) => (
                <FormControl key={field.name} isInvalid={!!errors[field.name]} mb="4">
                    <FormLabel>{field.label}</FormLabel>
                    <Input type={field.type} {...register(field.name)} />
                    {errors[field.name] && (
                        <FormErrorMessage>
                            {errors[field.name]?.message as string}
                        </FormErrorMessage>
                    )}
                </FormControl>
            ))}

            <Button type="submit" colorScheme="blue" width="full">Submit</Button>
        </Box>
    );
};

export default DynamicForm;
