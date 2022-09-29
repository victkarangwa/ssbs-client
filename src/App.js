import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import ClockComponent from "./components/Clock";
import "react-clock/dist/Clock.css";
import TextToSpeech from "./components/TextToSpech";
// import sound from "sound-play"

function App() {
  const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

  const [periodInfo, setPeriodInfo] = useState();
  const [announcement, setAnnouncement] = useState(false);

  useEffect(() => {
    socket.on("bell", (data) => {
      setPeriodInfo(data?.foundPeriod);
      const player = new Audio(data?.foundPeriod?.sound);
      player.play();
    });
    socket.on("announcement", (data) => {
      setAnnouncement(data?.foundAnnouncement);
    });
  }, [socket]);

  return (
    <div className='App'>
      <div className='card'>
        <h1 style={{ textAlign: "center " }}>Smart School Bell System</h1>
        <ClockComponent />
        {periodInfo?.id && (
          <div>
            <h1>Reason: {periodInfo?.name}</h1>
            <h1>
              Period: {periodInfo?.startTime} - {periodInfo?.endTime}
            </h1>
          </div>
        )}
        {announcement?.id && (
          <div style={{ textAlign: "center " }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextToSpeech text={announcement?.description} />
              </div>
              <h4>Reason: </h4> {announcement?.type} Announcement
              <h4>Message: </h4> {announcement?.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
