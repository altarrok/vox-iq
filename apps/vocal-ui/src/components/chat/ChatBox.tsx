import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
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
        >
            {messages.map((message, i) => (message.role !== "system") ? <Text key={i}>{message.role}: {message.content}</Text> : <></>)}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: {
        backgroundColor: 'pink',
        marginBottom: 15,
        width: '100%',
    },
});
