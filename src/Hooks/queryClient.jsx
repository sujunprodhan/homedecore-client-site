import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function Test() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyBooking />
    </QueryClientProvider>
  );
}

export default Test;
