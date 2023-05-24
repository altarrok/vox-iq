import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import { AppTitle } from '../src/components/entrance/AppTitle';
import { ChatBubble } from '../src/components/ChatBubble';
import { StartChattingButton } from '../src/components/entrance/StartChattingButton';
import { responsiveFontSize } from '../src/utils/responsiveFontSize';
import { SplashScreen, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Landing() {
    const router = useRouter();
    const [isLoaded] = useFonts({
        "jost-100": require("../assets/fonts/Jost-Thin.ttf"),
        "jost-200": require("../assets/fonts/Jost-ExtraLight.ttf"),
        "jost-300": require("../assets/fonts/Jost-Light.ttf"),
        "jost-400": require("../assets/fonts/Jost-Regular.ttf"),
        "jost-500": require("../assets/fonts/Jost-Medium.ttf"),
        "jost-600": require("../assets/fonts/Jost-SemiBold.ttf"),
        "jost-700": require("../assets/fonts/Jost-Bold.ttf"),
        "jost-800": require("../assets/fonts/Jost-ExtraBold.ttf"),
        "jost-900": require("../assets/fonts/Jost-Black.ttf"),
    });

    const handleOnLayout = useCallback(() => {
        if (isLoaded) {
            SplashScreen.hideAsync();
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

    return (
        <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight }]} onLayout={handleOnLayout}>
            <View style={styles.innerContainer}>
                <StatusBar style="light" translucent backgroundColor="transparent" />
                <AppTitle />
                <View style={styles.chatBubbleContainer}>
                    <ChatBubble
                        message='Welcome to Vox-iq. Ask me your questions using your voice and get best results, powered by ChatGPT!'
                        isUser={false}
                    />
                </View>
                <View style={styles.startButtonContainer}>
                    <StartChattingButton onPress={() => router.replace("chat")} />
                </View>
            </View>
        </SafeAreaView>
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
        marginTop: responsiveFontSize(20),
        marginBottom: responsiveFontSize(4),
    },
    chatBubbleContainer: {
        marginBottom: responsiveFontSize(8)
    },
    startButtonContainer: {
        width: "85%"
    },
});