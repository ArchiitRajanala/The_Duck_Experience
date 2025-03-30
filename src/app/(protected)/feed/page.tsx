'use client';

import { useEffect, useState } from 'react';
import { storage, auth } from '../../../lib/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  VStack,
  Heading,
  Spinner,
  useToast,
  Card,
  CardBody,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface DuckData {
  displayName: string;
  description: string;
  likeCount: number;
  imageUrl?: string;
  userId: string;
  duckId: string;
  modelUrl?: string;  // Add modelUrl for USDZ file
}

interface LikeState {
  [key: string]: boolean;
}

export default function FeedPage() {
  const [ducks, setDucks] = useState<DuckData[]>([]);
  const [loading, setLoading] = useState(true);
  const [likingStates, setLikingStates] = useState<LikeState>({});
  const toast = useToast();

  useEffect(() => {
    const fetchDucks = async () => {
      try {
        const userFoldersRef = ref(storage, 'duck-data');
        const userFolders = await listAll(userFoldersRef);
        
        const allDucksPromises = userFolders.prefixes.flatMap(async (userFolder) => {
          const userId = userFolder.name;
          const userDucksRef = ref(storage, `duck-data/${userId}`);
          const duckFiles = await listAll(userDucksRef);
          
          return Promise.all(duckFiles.items.map(async (dataFile) => {
            try {
              const duckId = dataFile.name.replace('.json', '');
              console.log(`Fetching duck data for ${userId}/${duckId}`);
              
              const dataUrl = await getDownloadURL(dataFile);
              const response = await fetch(dataUrl);
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const rawData = await response.json();
              console.log('Raw duck data:', rawData); // Debug log
              
              // Parse the data more carefully
              const duckData = {
                displayName: String(rawData.displayName || 'Unnamed Duck'),
                description: String(rawData.description || 'No description'),
                likeCount: Number(rawData.likeCount || 0),  // Ensure it's a number
                userId,
                duckId,
              };
              
              // Get both preview image and USDZ model
              try {
                const imageRef = ref(storage, `duck-previews/${userId}/${duckId}.jpg`);
                const modelRef = ref(storage, `duck-models/${userId}/${duckId}.usdz`);
                
                const [imageUrl, modelUrl] = await Promise.all([
                  getDownloadURL(imageRef).catch(() => undefined),
                  getDownloadURL(modelRef).catch(() => undefined)
                ]);

                return { ...duckData, imageUrl, modelUrl };
              } catch (error) {
                console.warn(`Error loading media for ${userId}/${duckId}:`, error);
                return duckData;
              }
            } catch (error) {
              console.error(`Error processing duck ${dataFile.name}:`, error);
              return null;
            }
          }));
        });

        const ducksData = (await Promise.all(allDucksPromises))
          .flat()
          .filter((duck): duck is DuckData => duck !== null)
          .sort((a, b) => b.likeCount - a.likeCount); // Sort by likeCount
        
        console.log('Processed ducks:', ducksData); // Debug log
        setDucks(ducksData);

      } catch (error: any) {
        toast({
          title: 'Error loading ducks',
          description: error.message,
          status: 'error',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDucks();
  }, [toast]);

  const handleLike = async (duck: DuckData) => {
    if (!auth.currentUser) {
      toast({
        title: 'Please login',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      setLikingStates(prev => ({ ...prev, [duck.duckId]: true }));

      // Create updated duck data
      const updatedDuck = {
        ...duck,
        likeCount: duck.likeCount + 1
      };

      // Convert to JSON and create blob
      const jsonData = JSON.stringify(updatedDuck);
      const blob = new Blob([jsonData], { type: 'application/json' });

      // Upload updated JSON
      const fileRef = ref(storage, `duck-data/${duck.userId}/${duck.duckId}.json`);
      await uploadBytes(fileRef, blob);

      // Update local state
      setDucks(prev => prev.map(d => 
        d.duckId === duck.duckId ? updatedDuck : d
      ));

      toast({
        title: 'Duck liked!',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: 'Error liking duck',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLikingStates(prev => ({ ...prev, [duck.duckId]: false }));
    }
  };

  if (loading) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Duck Feed</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {ducks.map((duck, index) => (
          <Card key={index} overflow="hidden">
            <CardBody>
              <VStack spacing={3} align="start" width="100%">
                {duck.imageUrl && (
                  <Box position="relative" width="100%">
                    {duck.modelUrl ? (
                      <a
                        href={duck.modelUrl}
                        rel="ar"
                        style={{
                          display: 'block',
                          width: '100%',
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={duck.imageUrl}
                          alt={duck.displayName}
                          borderRadius="lg"
                          width="100%"
                          height="200px"
                          objectFit="cover"
                        />
                        <Text
                          position="absolute"
                          bottom="2"
                          right="2"
                          bg="blackAlpha.700"
                          color="white"
                          px="2"
                          py="1"
                          borderRadius="md"
                          fontSize="sm"
                        >
                          View in AR QuickLook
                        </Text>
                      </a>
                    ) : (
                      <Image
                        src={duck.imageUrl}
                        alt={duck.displayName}
                        borderRadius="lg"
                        width="100%"
                        height="200px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                )}
                <Heading size="md">{duck.displayName}</Heading>
                <Text>{duck.description}</Text>
                <HStack width="100%" justify="space-between">
                  <Text fontWeight="bold">Likes: {duck.likeCount}</Text>
                  <IconButton
                    aria-label="Like duck"
                    icon={<FaHeart />}
                    colorScheme="red"
                    isLoading={likingStates[duck.duckId]}
                    onClick={() => handleLike(duck)}
                  />
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
