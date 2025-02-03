'use client';

import { useState, useCallback } from 'react';

export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingError = useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(
    async <T,>(promise: Promise<T>): Promise<T> => {
      try {
        startLoading();
        const result = await promise;
        return result;
      } catch (error) {
        setLoadingError(error instanceof Error ? error : new Error('An error occurred'));
        throw error;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, setLoadingError]
  );

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    withLoading,
  };
}
