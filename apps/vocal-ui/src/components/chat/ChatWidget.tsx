import { useEffect, useRef, useState } from "react";
import { useChatContext } from "./ChatContext";
import { StyleSheet, ScrollView, Text } from 'react-native';
import { trpc } from "../../utils/trpc";
import { ChatBox } from "./ChatBox";

export const ChatWidget: React.FC = () => {
    const { messages, addMessage } = useChatContext();
    const chatCompletionMutation = trpc.chat.chatCompletion.useMutation({
        onSuccess(data) {
            if (data) {
                addMessage(data)
            }
        },
    });

    useEffect(() => {
        if (messages[messages.length - 1]?.role === "user") {
            chatCompletionMutation.mutate({
                messages
            })
        }
    }, [messages])

    return (
        <ChatBox
            messages={messages}
        />
    );
}