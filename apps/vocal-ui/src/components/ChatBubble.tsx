import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../utils/responsiveFontSize';

interface Props {
    message: string;
    isUser: boolean;
}

export const ChatBubble: React.FC<Props> = ({ message, isUser }) => {
    const bubbleStyle = isUser ? styles.userBubble : styles.aiBubble;
    const bubbleContainerStyle = isUser ? styles.userBubbleContainer : styles.aiBubbleContainer;

    return (
        <View style={bubbleContainerStyle}>
            <View style={bubbleStyle}>
                {!isUser && <Text style={styles.chatGPTLabel}>ChatGPT</Text>}
                <Text style={styles.bubbleText}>{message}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userBubbleContainer: {
        alignSelf: 'flex-end',
        maxWidth: '75%',
    },
    aiBubbleContainer: {
        alignSelf: 'flex-start',
        maxWidth: '75%',
    },
    userBubble: {
        backgroundColor: '#ECECEC',
        borderTopLeftRadius: responsiveFontSize(8),
        borderTopRightRadius: responsiveFontSize(8),
        borderBottomLeftRadius: responsiveFontSize(8),
        paddingHorizontal: responsiveFontSize(4),
        paddingVertical: responsiveFontSize(4),
    },
    aiBubble: {
        backgroundColor: '#ECECEC',
        borderTopLeftRadius: responsiveFontSize(8),
        borderTopRightRadius: responsiveFontSize(8),
        borderBottomRightRadius: responsiveFontSize(8),
        paddingHorizontal: responsiveFontSize(4),
        paddingVertical: responsiveFontSize(4),
    },
    bubbleText: {
        fontFamily: "jost-300",
        color: '#1B1B1B',
        textAlign: 'left',
        fontSize: responsiveFontSize(4),
        lineHeight: responsiveFontSize(4) * 1.5
    },
    chatGPTLabel: {
        fontFamily: "jost-600",
        color: '#1B1B1B',
        fontSize: responsiveFontSize(4),
        marginBottom: 2,
    }
});