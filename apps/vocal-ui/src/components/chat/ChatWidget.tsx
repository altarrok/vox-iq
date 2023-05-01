import { useEffect } from "react";
import { useChatContext } from "./ChatContext";
import { Text } from 'react-native';
import { trpc } from "../../utils/trpc";

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
        <>
            {messages.map((message, i) => (message.role !== "system") ? <Text key={i}>{message.role}: {message.content}</Text> : <></>)}
        </>
    );
}