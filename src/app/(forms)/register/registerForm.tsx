"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { registerSchema } from '../(schemas)/authSchema';

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        getFieldState,
        getValues,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormInputs) => {
        console.log('get field state: ', getFieldState('email'));
        console.log('get values: ', getValues());
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="400px" mx="auto" p="4" boxShadow="md" borderRadius="md">
            <Text fontSize="2xl" mb="4" fontWeight="bold" textAlign="center">Register</Text>

            <FormControl isInvalid={!!errors.email} mb="4">
                <FormLabel>Email</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} mb="4">
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword} mb="4">
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" {...register('confirmPassword')} />
                <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">Register</Button>
        </Box>
    );
};

export default RegisterForm;
