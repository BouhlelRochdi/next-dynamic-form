
import React from 'react';
import { Box } from '@chakra-ui/react';
import LoginForm from './loginForm';

const LoginPage: React.FC = () => {
    return (
        <Box py="8" px="4">
            <LoginForm />
        </Box>
    );
};

export default LoginPage;
