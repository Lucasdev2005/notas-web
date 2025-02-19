'use client';

import { Box, Heading, Text, VStack, Container, Stack, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const handleRedirectLogin = () => {
    router.push("/login");
  };

  return ( 
    <Container maxW="container.md" py={10}>
      <VStack align="center" gap="2">
        <Heading size="5xl">
          <Text fontSize="4xl" textAlign="center">
            Bem-vindo ao Sistema de Cadastro de Notas
          </Text>
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Este sistema permite que você registre suas notas pessoais de forma rápida e eficiente. É simples e fácil de usar.
        </Text>

        <Box
          p={6}
          borderWidth={1}
          borderRadius="lg"
          shadow="lg"
          w="full"
          bg="white"
        >
          <Heading as="h3" size="lg" mb={4} textAlign="center">
            Como Funciona
          </Heading>
          <Text fontSize="md" color="gray.700" mb={4}>
            1. Faça login no sistema.
          </Text>
          <Text fontSize="md" color="gray.700" mb={4}>
            2. Após o login, você poderá cadastrar suas notas pessoais.
          </Text>
          <Text fontSize="md" color="gray.700" mb={4}>
            3. Visualize e organize suas notas a qualquer momento.
          </Text>
        </Box>

        <Button
          colorPalette="teal" 
          variant="outline"
          onClick={handleRedirectLogin}
          size="lg"
          mt={8}
        >
          Acessar Login
        </Button>
      
        <Heading size="5xl">
          <Text fontSize="3xl" textAlign="center">
            Tecnologias utilizadas
          </Text>
        </Heading>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          shadow="lg"
          bg="white"
        >
          <Stack direction="row" h="20" justifyContent="center" alignItems="center">
            {
              [
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
                  alt: "Logo NextJS"
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
                  alt: "Logo NestJS"
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
                  alt: "Logo MongoDB"
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
                  alt: "Logo Docker"
                }
              ].map((element, index) => {
                return (
                  <Image 
                    key={index}
                    src={element.src} 
                    alt={element.alt}
                    width={120}
                    height={120}
                  />                
                )
              })
            }

          </Stack>
        </Box>
      </VStack>
    </Container>
  );
}
