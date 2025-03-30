'use client';

import React, { useState } from 'react';
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
import { register } from '../../utils/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(email, password, username);
      toast({
        title: 'Welcome to The Duck Experience!',
        description: 'Account created successfully',
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
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              focusBorderColor="orange.400"
            />
          </FormControl>

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
              placeholder="Create a password"
              focusBorderColor="orange.400"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="orange"
            width="100%"
            isLoading={isLoading}
          >
            Sign Up
          </Button>

          <Divider />

          <Text fontSize="sm">
            Already have an account?{' '}
            <Link href="/login">
              <Button variant="link" colorScheme="orange">
                Log in
              </Button>
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterForm;