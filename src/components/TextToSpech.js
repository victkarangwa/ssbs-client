import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, useEffect } from "react";
import Speech from "speak-tts";

const TextToSpeech = ({ text }) => {
  const [status, setStatus] = useState("");
  const [initiated, setInitiated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const speech = new Speech(); // will throw an exception if not browser supported

  speech
    .init()
    .then((data) => {
      setInitiated(true);
    })
    .catch((e) => {
      setInitiated(false);
    });

  useEffect(() => {
    playSpeech();
  }, []);

  const playSpeech = () => {
    setPlaying(true);
    speech
      .speak({
        text,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
            setPlaying(false);
          },
          onresume: () => {
            console.log("Resume utterance");
          },
        },
      })
      .then(() => {
        setStatus(true);
      })
      .catch((e) => {
        setStatus(false);
      });
  };

  const stopSpeech = () => {
    speech.cancel();
    setPlaying(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button onClick={playSpeech} icon={<SoundOutlined />} />

      <div style={{ margin: "1px 5px" }} />
      <Button onClick={stopSpeech} icon={<PauseCircleOutlined />} />
    </div>
  );
};

export default TextToSpeech;
