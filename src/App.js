import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import ClockComponent from "./components/Clock";
import "react-clock/dist/Clock.css";
// import sound from "sound-play"

function App() {
  const socket = socketIOClient("http://localhost:5000");

  useEffect(() => {
    socket.on("bell", (data) => {
      const player = new Audio(data?.foundPeriods?.sound);
      player.play();
    });
  }, [socket]);

  return (
    <div className='App'>
      <div className=''>
        <h1 style={{ textAlign: "center " }}>Smart School Bell System</h1>
        <ClockComponent />
      </div>
    </div>
  );
}

export default App;
