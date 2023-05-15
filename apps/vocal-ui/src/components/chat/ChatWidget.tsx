import { useEffect } from "react";
import { useChatContext } from "./ChatContext";
import { trpc } from "../../utils/trpc";
import { ChatBox } from "./ChatBox";

export const ChatWidget: React.FC = () => {
    const { messages, volume, addMessage } = useChatContext();
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
            aiLoadingMessage={chatCompletionMutation.isLoading}
            shouldSpeak={volume}
        />
    );
}
