'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box minH="100vh" bg="white">
      <Container maxW="container.xl" pt={8} pb={16}>
        <VStack spacing={8} textAlign="center">
          <Heading size="xl" color="orange.500">
            Welcome to The Duck Experience
          </Heading>
          
          <Box 
            maxW="800px" 
            w="100%" 
            position="relative"
            overflow="hidden"
            borderRadius="3xl"
          >
            <Box
              as="img"
              src="/Project_Presentation.gif"
              alt="Duck Experience Presentation"
              width="100%"
              height="auto"
              style={{
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              borderRadius="3xl"
              pointerEvents="none"
            />
          </Box>

          <Text fontSize="lg" color="gray.600" fontWeight="medium">
            This is a unique platform for exploring and sharing duck-related content.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;