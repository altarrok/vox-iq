import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { responsiveFontSize } from "../../utils/responsiveFontSize";


export const StartChattingButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
    return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#CBFF97',
        paddingVertical: responsiveFontSize(5),
        paddingHorizontal: responsiveFontSize(8),
        borderRadius: responsiveFontSize(8),
        width: "100%",
    },
    buttonText: {
        fontFamily: "jost-600",
        color: '#1B1B1B',
        fontSize: responsiveFontSize(8),
        textAlign: "center"
    }
});