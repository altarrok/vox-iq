import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
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

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChatContextProvider>
          <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight }]}>
            <View style={styles.innerContainer}>
              <StatusBar barStyle="light-content" />
              <ChatWidget />
              <ChatButton />
            </View>
          </SafeAreaView>
        </ChatContextProvider>
      </QueryClientProvider>
    </trpc.Provider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
