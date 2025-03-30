import React from 'react';
import Link from 'next/link';
import { Box, Flex, HStack, Button, Heading } from '@chakra-ui/react';

const Header: React.FC = () => {
    return (
        <Box as="header" py={4} bg="yellow.100" borderBottom="1px" borderColor="yellow.300">
            <Flex maxW="container.lg" mx="auto" px={4} justify="space-between" align="center">
                <Link href="/">
                    <Heading size="md" color="orange.500">The Duck Experience</Heading>
                </Link>
                <HStack spacing={4}>
                    <Link href="/login">
                        <Button colorScheme="orange" variant="ghost">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button colorScheme="orange" variant="ghost">Register</Button>
                    </Link>
                    <Link href="/feed">
                        <Button colorScheme="orange" variant="ghost">Feed</Button>
                    </Link>
                    <Link href="/profile">
                        <Button colorScheme="orange" variant="ghost">Profile</Button>
                    </Link>
                </HStack>
            </Flex>
        </Box>
    );
};

export default Header;