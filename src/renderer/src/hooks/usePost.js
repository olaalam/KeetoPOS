import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../lib/api';

/**
 * Generic POST hook
 * @param {string} url - The API endpoint
 * @param {object} options - Additional React Query useMutation options
 */
export const usePost = (url, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => api.post(url, data),
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
      toast.error(error.response?.data?.message || 'An error occurred during creation.');
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
