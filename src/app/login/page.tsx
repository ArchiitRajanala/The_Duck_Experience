'use client';

import { Box, Container, Heading, Image } from '@chakra-ui/react';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Container maxW="container.sm" py={8}>
      <Box textAlign="center" mb={8}>
        <Box mb={4}>
          <Heading size="lg" color="orange.500">Welcome to The Duck Experience</Heading>
        </Box>
      </Box>
      <LoginForm />
    </Container>
  );
}
