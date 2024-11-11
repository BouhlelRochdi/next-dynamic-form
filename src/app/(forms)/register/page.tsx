// src/pages/register.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import RegisterForm from './registerForm';

const RegisterPage: React.FC = () => {
    return (
        <Box py="8" px="4">
            <RegisterForm />
        </Box>
    );
};

export default RegisterPage;
