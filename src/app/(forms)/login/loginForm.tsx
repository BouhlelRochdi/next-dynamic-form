"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { loginSchema } from '../(schemas)/authSchema';

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log('Login data:', data);

    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="400px" mx="auto" p="4" boxShadow="md" borderRadius="md">
            <Text fontSize="2xl" mb="4" fontWeight="bold" textAlign="center">Login</Text>

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

            <Button type="submit" colorScheme="blue" width="full">Login</Button>
        </Box>
    );
};

export default LoginForm;
