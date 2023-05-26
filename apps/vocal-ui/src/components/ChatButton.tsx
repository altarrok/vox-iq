import { trpc } from "../utils/trpc";
import { useChatContext } from "./chat/ChatContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MicrophoneEnabledLogo } from "./MicrophoneEnabledLogo";
import { MicrophoneDisabledLogo } from "./MicrophoneDisabledLogo";
import { LoadingIndicator } from "./LoadingIndicator";
import { responsiveFontSize } from "../utils/responsiveFontSize";

export const ChatButton: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [recordingStatus, setRecordingStatus] = useState<"idle" | "recording">("idle");
  const [audioPermission, setAudioPermission] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { addMessage, volume, setVolume } = useChatContext();
  const transcribeMutation = trpc.transcribe.transcribe.useMutation({
    onSuccess(data) {
      if (data) {
        addMessage({
          role: "user",
          content: data,
        });
      }
    },
  });

  useEffect(() => {
    async function getAudioPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          setAudioPermission(permission.granted);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    getAudioPermission();

    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
      setAnimate(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        await recording!.stopAndUnloadAsync();

        const blobToBase64 = (blob: any) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        };

        // Fetch audio binary blob data

        const audioURI = recording!.getURI();
        if (audioURI === null) throw new Error("Audio URI is null");
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", audioURI, true);
          xhr.send(null);
        });

        const audioBase64Data = (await blobToBase64(blob)) as string;
        const audioBase64 = audioBase64Data.split(",")[1];
        transcribeMutation.mutate({ recording: audioBase64, format: "m4a" });
        setRecordingStatus("idle");
        setRecording(undefined);
        setAnimate(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <TouchableOpacity>
      <View style={styles.lol}>
        <View
          style={
            transcribeMutation.isLoading || recordingStatus === "recording"
              ? [styles.dotLoading, styles.center]
              : [styles.dot, styles.center]
          }
        >
          {animate &&
            [...Array(2).keys()].map((i) => {
              return (
                <MotiView
                  from={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  key={i}
                  style={[StyleSheet.absoluteFillObject, styles.dotLoading]}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    easing: Easing.out(Easing.ease),
                    loop: true,
                    delay: i * 500,
                    repeatReverse: false,
                  }}
                />
              );
            })}
          <View>
            <TouchableOpacity
              onPress={() => recordingStatus === "idle" ? startRecording() : stopRecording()}
            >
              {
                transcribeMutation.isLoading ? (
                  <LoadingIndicator />
                ) : (
                  recordingStatus === "recording" ? (
                    <MicrophoneDisabledLogo />
                  ) : (
                    <MicrophoneEnabledLogo />
                  )
                )
              }
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FontAwesome
            size={responsiveFontSize(10)}
            name={volume ? "volume-up" : "volume-off"}
            onPress={() => setVolume(!volume)}
            style={styles.cmon}
            color={"#CBFF97"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cmon: {
    position: "absolute",
    marginLeft: responsiveFontSize(10),
    marginTop: responsiveFontSize(5),
  },
  lol: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
  },
  dot: {
    width: responsiveFontSize(20),
    height: responsiveFontSize(20),
    borderRadius: responsiveFontSize(20),
    backgroundColor: "#CBFF97",
  },
  dotLoading: {
    width: responsiveFontSize(20),
    height: responsiveFontSize(20),
    borderRadius: responsiveFontSize(20),
    backgroundColor: "#444444",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
