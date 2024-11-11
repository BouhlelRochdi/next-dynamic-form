"use client";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Select, RadioGroup, Radio, Box } from '@chakra-ui/react';
import { generateSchema } from './generateSchema';
import './styles.css';

const DynamicForm = ({ formConfig }: { formConfig: any }) => {

    const schema = generateSchema(formConfig);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    // Step 3: Define the form submission handler
    const onSubmit = (data: any) => {
        console.log("Form submitted with data:", data);
    };

    console.log("Errors:", errors);

    // Helper function to render fields
    const renderField = (field: any) => {
        if (field.type === "object" && field.fields) {
            return (
                <Box key={field.name} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                    <FormLabel>{field.label}</FormLabel>
                    {field.fields.map(renderField)}
                </Box>
            );
        }

        return (
            <FormControl key={field.name} isInvalid={!!errors[field.name]} mb={4}>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                {field.type === "select" ? (
                    <Select id={field.name} {...register(field.name)}>
                        {field.options.map((option: any) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                ) : field.type === "radio" ? (
                    <Controller
                        name={field.name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup onChange={onChange} value={value}>
                                {field.options.map((option: any) => (
                                    <Radio key={option.value} value={option.value}>
                                        {option.label}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        )}
                    />
                ) : (
                    <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name)}
                    />
                )}
                <FormErrorMessage>
                    {errors[field.name]?.message?.toString()}
                </FormErrorMessage>
            </FormControl>
        );
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form">
                {formConfig.map(renderField)}
                <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default DynamicForm;
