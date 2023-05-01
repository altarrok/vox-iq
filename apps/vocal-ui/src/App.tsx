import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { trpc } from './utils/trpc';
import { ChatContextProvider } from './components/chat/ChatContext';
import { ChatWidget } from './components/chat/ChatWidget';
import { ChatButton } from './components/ChatButton';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://192.168.1.70:8000/trpc",
        }),
      ],
    }),
  );


  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChatContextProvider>
          <View style={styles.container}>
            <ChatWidget />
            <ChatButton />
          </View>
        </ChatContextProvider>
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

