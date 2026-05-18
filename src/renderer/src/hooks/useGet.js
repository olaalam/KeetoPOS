import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

/**
 * Generic GET hook
 * @param {Array} queryKey - The cache key for the query (array format recommended)
 * @param {string} url - The API endpoint
 * @param {object} options - Additional React Query useQuery options
 */
export const useGet = (queryKey, url, options = {}) => {
  return useQuery({
    queryKey,
    queryFn: () => api.get(url),
    ...options,
  });
};
