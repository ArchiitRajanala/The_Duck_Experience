'use client';

import { Box, Container, Heading } from '@chakra-ui/react';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <Container maxW="container.sm" py={8}>
      <Box textAlign="center" mb={8}>
        <Box mb={4}>
          <Heading size="lg" color="orange.500">Join The Duck Experience</Heading>
        </Box>
      </Box>
      <RegisterForm />
    </Container>
  );
}