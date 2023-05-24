import { useRef, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TMessage } from "./ChatContext";
import * as Speach from "expo-speech";
import { ChatBubble, LoadingChatBubble } from "../ChatBubble";
import { responsiveFontSize } from "../../utils/responsiveFontSize";

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
                    <View style={style.bubbleContainer} key={i}>
                        <ChatBubble message={message.content} isUser={message.role === "user"} />
                    </View>
                ) : null
            ))}
            {aiLoadingMessage && (
                    <View style={style.bubbleContainer}  key={"loading"}>
                        <LoadingChatBubble />
                    </View>
            )}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: {
        marginBottom: responsiveFontSize(5),
        paddingHorizontal: responsiveFontSize(5),
        width: '100%',
    },
    bubbleContainer: {
        marginBottom: responsiveFontSize(5),
    }
});



