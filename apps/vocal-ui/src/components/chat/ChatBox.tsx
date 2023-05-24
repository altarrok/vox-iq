import { useRef, useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { TMessage } from "./ChatContext";
import * as Speach from "expo-speech";
import { ChatBubble, LoadingChatBubble } from "../ChatBubble";
import { responsiveFontSize } from "../../utils/responsiveFontSize";

export const ChatBox: React.FC<{ messages: TMessage[], aiLoadingMessage: boolean, shouldSpeak: boolean }> = ({ messages, aiLoadingMessage, shouldSpeak }) => {
    const flatListRef = useRef<FlatList | null>(null);

    useEffect(() => {
        if (messages[messages.length - 1].role === "assistant" && shouldSpeak) {
            Speach.speak(messages[messages.length - 1].content);
        }
    }, [messages, shouldSpeak]);

    return (
        <FlatList
            style={style.scrollView}
            ref={flatListRef}
            data={[...messages, ...(aiLoadingMessage ? [{ role: "system", content: "" }] : [])]}
            renderItem={({ item, index }) =>
                item.role !== "system" ? (
                    <View style={style.bubbleContainer} key={index}>
                        <ChatBubble message={item.content} isUser={item.role === "user"} />
                    </View>
                ) : null
            }
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
                <>
                    {aiLoadingMessage && (
                        <View style={style.bubbleContainer}>
                            <LoadingChatBubble />
                        </View>
                    )}
                </>
            )}
        />
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
