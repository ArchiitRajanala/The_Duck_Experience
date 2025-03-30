'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth, storage, db } from '../../../lib/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Spinner,
  Card,
  CardBody,
  Button,
  Avatar,
  Input,
  useToast,
  Center,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

interface UserData {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface Preferences {
  favoriteDuck: string;
  bio: string;
  location: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [preferences, setPreferences] = useState<Preferences>({
    favoriteDuck: '',
    bio: '',
    location: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });

        const loadPreferences = async () => {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().preferences) {
            setPreferences(userDoc.data().preferences);
          }
        };

        loadPreferences();
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      // Create a file name with timestamp to prevent caching issues
      const fileName = `profile_${Date.now()}.${file.name.split('.').pop()}`;
      
      // Update storage reference path to match Firebase rules structure
      const storageRef = ref(storage, `profile-pics/${user.uid}/${fileName}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const photoURL = await getDownloadURL(storageRef);
      
      // Update user profile
      await updateProfile(user, { photoURL });
      
      // Update local state
      setUserData(prev => prev ? { ...prev, photoURL } : null);
      
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Error uploading image',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!auth.currentUser) return;

      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        preferences
      });

      toast({
        title: 'Preferences saved',
        status: 'success',
        duration: 3000,
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Error saving preferences',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Container centerContent py={8}>
        <Spinner size="xl" color="orange.500" />
      </Container>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color="orange.500" textAlign="center">
          Duck Experience Profile
        </Heading>
        
        <Card variant="outline" borderColor="yellow.200">
          <CardBody>
            <VStack spacing={6}>
              <Center position="relative">
                <Avatar
                  size="2xl"
                  src={userData.photoURL || undefined}
                  name={userData.displayName || userData.email || undefined}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  display="none"
                />
                <Button
                  size="sm"
                  colorScheme="orange"
                  position="absolute"
                  bottom="-2"
                  onClick={() => fileInputRef.current?.click()}
                  isLoading={uploading}
                >
                  Change Photo
                </Button>
              </Center>

              <VStack spacing={4} align="stretch" width="100%">
                <Box>
                  <Text fontWeight="bold" color="gray.600">Email</Text>
                  <Text fontSize="lg">{userData.email}</Text>
                </Box>
                
                <Divider />
                
                <Box>
                  <Text fontWeight="bold" color="gray.600">Username</Text>
                  <Text fontSize="lg">{userData.displayName || 'No username set'}</Text>
                </Box>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        <Divider />

        <Box w="100%">
          <Heading size="md" mb={4} color="orange.500">
            Duck Preferences
          </Heading>

          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Favorite Duck</FormLabel>
              <Input
                value={preferences.favoriteDuck}
                onChange={(e) => setPreferences({
                  ...preferences,
                  favoriteDuck: e.target.value
                })}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={preferences.bio}
                onChange={(e) => setPreferences({
                  ...preferences,
                  bio: e.target.value
                })}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                value={preferences.location}
                onChange={(e) => setPreferences({
                  ...preferences,
                  location: e.target.value
                })}
                isReadOnly={!isEditing}
              />
            </FormControl>

            {isEditing ? (
              <Button colorScheme="orange" onClick={handleSave}>
                Save Preferences
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Preferences
              </Button>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}