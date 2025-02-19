'use client'

import React, { createContext, useContext, useState } from 'react';
import { LoadingContextType } from '../types/loading-context-type';
import { LoadingProviderProps } from '../types/loading-provider-props';
import { Center, Spinner } from '@chakra-ui/react';


const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const startLoading = (): void => setLoading(true);
  const stopLoading = (): void => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {
        loading 
          && ( 
            <Center height="100vh">
              <Spinner size="xl"/>
            </Center>
          ) 
          || children
      }
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
};
