import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { trpc } from './utils/trpc';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8000/trpc',
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </QueryClientProvider>
    </trpc.Provider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function useState(arg0: () => any): [any] {
  throw new Error('Function not implemented.');
}

