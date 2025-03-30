'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { login } from '../../utils/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Welcome to The Duck Experience!',
        status: 'success',
        duration: 3000,
      });
      router.push('/feed');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      p={8} 
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="lg"
      bg="white"
      borderColor="yellow.200"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="orange.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="orange.400"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="orange"
            width="100%"
            isLoading={isLoading}
          >
            Log In
          </Button>

          <Divider />

          <Text fontSize="sm">
            New to The Duck Experience?{' '}
            <Link href="/register">
              <Button variant="link" colorScheme="orange">
                Sign up
              </Button>
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;