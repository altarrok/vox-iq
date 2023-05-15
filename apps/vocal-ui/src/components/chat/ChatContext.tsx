import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import type { AppRouterOutput } from 'vocal-api';

export type TMessage = NonNullable<AppRouterOutput['chat']['chatCompletion']>

interface IChatContext {
    messages: TMessage[]
    volume: boolean
    addMessage: (message: TMessage) => void
    setVolume: (volume: boolean) => void
}

const defaultContextState: IChatContext = {
    messages: [
        {
            role: "system",
            content: "You are a voice assistant. Use short and precise answers. Max 100 tokens per answer."
        }
    ],
    volume: true,
    setVolume: () => void 0,
    addMessage: () => console.error("ChatContext not yet initialized!"),
}

const ChatContext = createContext<IChatContext>(defaultContextState);

export const ChatContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [contextState, setContextState] = useState<IChatContext>(defaultContextState);

    useEffect(() => {
        setContextState((prevState) => ({
            ...prevState,
            setVolume: (volume: boolean) => setContextState((prevState) => ({ ...prevState, volume })),
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