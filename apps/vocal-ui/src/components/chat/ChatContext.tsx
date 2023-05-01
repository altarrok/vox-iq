import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import type { AppRouterOutput } from 'vocal-api';

type TMessage = NonNullable<AppRouterOutput['chat']['chatCompletion']>

interface IChatContext {
    messages: TMessage[]
    addMessage: (message: TMessage) => void
}

const defaultContextState: IChatContext = {
    messages: [
        {
            role: "system",
            content: "You are a voice assistant. Use short and precise answers"
        }
    ],
    addMessage: () => console.error("ChatContext not yet initialized!"),
}

const ChatContext = createContext<IChatContext>(defaultContextState);

export const ChatContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [contextState, setContextState] = useState<IChatContext>(defaultContextState);

    useEffect(() => {
        setContextState((prevState) => ({
            ...prevState,
            addMessage: (message: TMessage) => setContextState((prevState) => ({ ...prevState, messages: [...prevState.messages, message]}))
        }))
    }, [setContextState])

    return (
        <ChatContext.Provider value={contextState}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChatContext = () => useContext(ChatContext);