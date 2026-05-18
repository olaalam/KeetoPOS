import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../lib/api';

/**
 * Generic PUT hook
 * @param {string} url - The API endpoint base URL
 * @param {object} options - Additional React Query useMutation options
 */
export const usePut = (url, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => {
      const endpoint = id ? `${url}/${id}` : url;
      return api.put(endpoint, data);
    },
    onSuccess: (data, variables, context) => {
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      if (options.invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueryKey });
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      toast.error(error.response?.data?.message || 'An error occurred during update.');
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
