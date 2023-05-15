import { useRef, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TMessage } from "./ChatContext";
import { ActivityIndicator } from 'react-native';
import * as Speach from "expo-speech";

export const ChatBox: React.FC<{ messages: TMessage[], aiLoadingMessage: boolean, shouldSpeak: boolean }> = ({ messages, aiLoadingMessage, shouldSpeak }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        if (messages[messages.length - 1].role === "assistant" && shouldSpeak) {
            Speach.speak(messages[messages.length - 1].content);
        }
      }, [messages, shouldSpeak]);

    return (
        <ScrollView
            style={style.scrollView}
            ref={scrollViewRef}
            onContentSizeChange={() => isAtBottom ? scrollViewRef.current?.scrollToEnd({ animated: true }) : undefined}
            onScroll={(event) => {
                const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
                const isUserAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
                setIsAtBottom(isUserAtBottom);
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        >
            {messages.map((message, i) => (
                message.role !== "system" ? (
                    <View
                        key={i}
                        style={message.role === "user" ?
                            [style.bubbleContainer, style.userBubbleContainer] :
                            [style.bubbleContainer, style.aiBubbleContainer]}
                    >
                        {message.role === "assistant" && <Text style={style.chatGPTLabel}>ChatGPT</Text>}
                        {message.role === "user" ? (
                            <View style={[style.bubble, style.userBubble]}>
                                <Text style={style.bubbleText}>
                                    {message.content}
                                </Text>
                            </View>
                        ) : (
                            <LinearGradient
                                colors={["rgba(70,40,96,1)", "rgba(48,11,154,1)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={[style.bubble, style.linearGradient]}
                            >
                                <Text style={style.bubbleText}>
                                    {message.content}
                                </Text>
                            </LinearGradient>
                        )}
                    </View>
                ) : null
            ))}
            {aiLoadingMessage && (
                <View style={style.aiBubbleContainer} key="loading">
                    <Text style={style.chatGPTLabel}>ChatGPT</Text>
                    <LinearGradient
                        colors={["rgba(70,40,96,1)", "rgba(48,11,154,1)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[style.bubble, style.linearGradient, style.loadingBubble]}
                    >
                        <Text style={style.bubbleText}>
                            <ActivityIndicator size="small" color="#fff" />
                        </Text>
                    </LinearGradient>
                </View>
            )}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: {
        marginBottom: 15,
        width: '100%',
    },
    bubbleContainer: {
        marginBottom: 8,
        maxWidth: '80%',
    },
    userBubbleContainer: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    aiBubbleContainer: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    userBubble: {
        backgroundColor: '#007AFF',
    },
    bubble: {
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    linearGradient: {
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    bubbleText: {
        color: 'white',
        textAlign: 'left',
    },
    chatGPTLabel: {
        alignSelf: 'flex-start',
        color: '#787878',
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 2,
        marginLeft: 10,
    },
    loadingBubble: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});



