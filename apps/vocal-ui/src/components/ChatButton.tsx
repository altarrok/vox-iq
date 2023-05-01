import { Button } from "react-native";
import { trpc } from "../utils/trpc";
import { useChatContext } from "./chat/ChatContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const testAudioBase64 = "lol";

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
        setRecordingStatus("stopped");
        setRecording(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FontAwesome.Button
      name={recording ? "microphone-slash" : "microphone"}
      size={64}
      onPress={() =>
        recordingStatus === "idle" ? startRecording() : stopRecording()
      }
    >
      Talk AMK
    </FontAwesome.Button>
  );
};
