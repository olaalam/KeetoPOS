import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppRouter } from '@/router';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* AppRouter handles HashRouter and all authentication routes */}
      <AppRouter />
      
      {/* Global sonner toaster notifications */}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
