import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import { trpc } from '../src/utils/trpc';
import { ChatContextProvider } from '../src/components/chat/ChatContext';
import { ChatWidget } from '../src/components/chat/ChatWidget';
import { ChatButton } from '../src/components/ChatButton';
import { ChatTitleLogo } from '../src/components/ChatTitleLogo';


export default function Chat() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://192.168.1.22:8000/trpc",
                }),
            ],
        }),
    );

    const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ChatContextProvider>
                    <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight }]}>
                        <View style={Platform.OS === 'android' ? styles.innerContainerAndroid : styles.innerContainer}>
                            <StatusBar style="light" translucent backgroundColor="transparent" />
                            <ChatTitleLogo />
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
        backgroundColor: '#1B1B1B',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainerAndroid: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    }
});

