"use client"
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DynamicForm from '@/components/DynamicForm';

const DynamicFormPage: React.FC = () => {
    return (
        <Box py="8" px="4">
            <Heading as="h1" mb="8" textAlign="center">Dynamic Form</Heading>
            <DynamicForm />
        </Box>
    );
};

export default DynamicFormPage;
