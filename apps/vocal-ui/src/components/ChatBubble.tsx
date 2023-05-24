import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../utils/responsiveFontSize';
import { LoadingIndicator } from './LoadingIndicator';
import { ThreeDotLoadingIndicator } from './ThreeDotLoadingIndicator';

interface Props {
    message: string;
    isUser: boolean;
}

export const ChatBubble: React.FC<Props> = ({ message, isUser }) => {
    const bubbleStyle = isUser ? styles.userBubble : styles.aiBubble;
    const bubbleContainerStyle = isUser ? styles.userBubbleContainer : styles.aiBubbleContainer;
    const bubbleTextStyle = isUser ? styles.userBubbleText : styles.aiBubbleText;

    return (
        <View style={bubbleContainerStyle}>
            <View style={bubbleStyle}>
                {!isUser && <Text style={styles.chatGPTLabel}>ChatGPT</Text>}
                <Text style={bubbleTextStyle}>{message}</Text>
            </View>
        </View>
    );
}

export const LoadingChatBubble: React.FC = () => {
    return (
        <View style={[styles.aiBubbleContainer, styles.aiBubble, styles.loadingBubble]}>
            <ThreeDotLoadingIndicator />
        </View>
    )
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
        backgroundColor: '#CBFF97',
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
    userBubbleText: {
        fontFamily: "jost-400",
        color: '#1B1B1B',
        textAlign: 'left',
        fontSize: responsiveFontSize(4),
        lineHeight: responsiveFontSize(4) * 1.5
    },
    aiBubbleText: {
        fontFamily: "jost-300",
        color: '#1B1B1B',
        textAlign: 'left',
        fontSize: responsiveFontSize(4),
        lineHeight: responsiveFontSize(4) * 1.5
    },
    loadingBubble: {
        backgroundColor: '#444444',
        width: responsiveFontSize(18),
        height: responsiveFontSize(3),
    },
    chatGPTLabel: {
        fontFamily: "jost-600",
        color: '#1B1B1B',
        fontSize: responsiveFontSize(4),
        marginBottom: 2,
    }
});