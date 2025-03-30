'use client';

import { Box, HStack, Button, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  // Remove the spacing and fontSize breakpoints as we'll use fixed values
  const buttonWidth = useBreakpointValue({
    base: '4rem',    // 64px
    sm: '5rem',      // 80px
    md: '6rem',      // 96px
    lg: '7rem'       // 112px
  });

  return (
    <Box 
      as="nav" 
      bg="white" 
      shadow="sm" 
      position="sticky" 
      top="0" 
      zIndex="sticky"
      h="48px"
      px={2}
    >
      <HStack 
        spacing={2} 
        justify="flex-end"
        maxW="container.xl"
        mx="auto"
        h="100%"
      >
        <Button
          size="sm"
          fontSize="13px"
          variant="ghost"
          onClick={() => router.push('/feed')}
          minW={buttonWidth}
          maxW={buttonWidth}
          px={2}
        >
          Feed
        </Button>
        <Button
          size="sm"
          fontSize="13px"
          variant="ghost"
          onClick={() => router.push('/capture')}
          minW={buttonWidth}
          maxW={buttonWidth}
          px={2}
        >
          Capture
        </Button>
        <Button
          size="sm"
          fontSize="13px"
          colorScheme="orange"
          onClick={() => router.push('/profile')}
          minW={buttonWidth}
          maxW={buttonWidth}
          px={2}
        >
          Profile
        </Button>
      </HStack>
    </Box>
  );
}
