import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TMessage } from "./ChatContext";

export const ChatBox: React.FC<{ messages: TMessage[] }> = ({ messages }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    
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
                    <View key={i} style={message.role === "user" ? style.userBubbleContainer : style.aiBubbleContainer}>
                        {message.role === "assistant" && <Text style={style.chatGPTLabel}>ChatGPT</Text>}
                        {message.role === "user" ? (
                            <View style={style.userBubble}>
                                <Text style={style.bubbleText}>
                                    {message.content}
                                </Text>
                            </View>
                        ) : (
                            <LinearGradient
                                colors={["rgba(131,58,180,1)", "rgba(0,121,191,1)", "rgba(172,0,0,1)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[style.aiBubble, style.linearGradient]}
                            >
                                <Text style={style.bubbleText}>
                                    {message.content}
                                </Text>
                            </LinearGradient>
                        )}
                    </View>
                ) : null
            ))}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: {
        marginBottom: 15,
        width: '100%',
    },
    userBubbleContainer: {
        alignSelf: 'flex-end',
        marginBottom: 8,
        marginRight: 10,
        maxWidth: '80%',
    },
    userBubble: {
        backgroundColor: '#007AFF',
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    aiBubbleContainer: {
        alignSelf: 'flex-start',
        marginBottom: 8,
        marginLeft: 10,
        maxWidth: '80%',
    },
    aiBubble: {
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
});
