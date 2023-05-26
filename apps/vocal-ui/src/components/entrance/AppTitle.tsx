import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { responsiveFontSize } from "../../utils/responsiveFontSize";
import { TitleIcon } from "./TitleIcon";

export const AppTitle: React.FC = () => {
    return (
        <>
            {/* @ts-ignore:next-line */}
            <MaskedView
                style={{ height: responsiveFontSize(35) * 1.1, width: "100%" }}
                maskElement={
                    <Text
                        style={{
                            fontFamily: "jost-500",
                            fontSize: responsiveFontSize(35),
                            textAlign: 'left',
                            lineHeight: responsiveFontSize(35) * 1.1,
                        }}
                    >
                        {"VOX-"}
                    </Text>
                }
            >
                <LinearGradient
                    colors={["#36FFCF", "#CBFF97"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    style={{ height: responsiveFontSize(35) * 1.1 * 1, width: "100%" }}
                />
            </MaskedView>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {/* @ts-ignore:next-line */}
                <MaskedView
                    style={{ flexDirection: 'row', flex: 1 }}
                    maskElement={
                        <Text
                            style={{
                                fontFamily: "jost-500",
                                fontSize: responsiveFontSize(35),
                                textAlign: 'left',
                                lineHeight: responsiveFontSize(35) * 1.1,
                            }}
                        >
                            {"iQ"}
                        </Text>
                    }
                >
                    <LinearGradient
                        colors={["#36FFCF", "#CBFF97"]}
                        start={{ x: -1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ height: responsiveFontSize(35) * 1.1 * 1, width: "100%" }}
                    />
                </MaskedView>
                <View style={{ flex: 1 }}>
                    <TitleIcon />
                </View>
            </View>
        </>
    );
}