import { Button } from "react-native";
import { trpc } from "../utils/trpc";
import { useChatContext } from "./chat/ChatContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export const ChatButton: React.FC = () => {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(false);

  const { addMessage } = useChatContext();
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
      console.log(newRecording);
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (err) {
      console.error(err);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === "recording") {
        await recording.stopAndUnloadAsync();
        

        const blobToBase64 = (blob:any) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        };

        // Fetch audio binary blob data

        const audioURI = recording.getURI();
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

        const audioBase64Data = await blobToBase64(blob) as string;
        const audioBase64 = audioBase64Data.split(",")[1];
        transcribeMutation.mutate({recording: audioBase64, format: "m4a"})
        console.log(audioBase64);
        setRecordingStatus("idle");
        setRecording(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FontAwesome.Button
      name={recordingStatus === "idle" ? "microphone" : "microphone-slash"}
      size={64}
      onPress={() =>
        recordingStatus === "idle" ? startRecording() : stopRecording()
      }
    >
      Talk AMK
    </FontAwesome.Button>
  );
};
