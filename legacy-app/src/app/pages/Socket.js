import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Socket = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketIo = io("http://localhost:8080");

  const sendMessage = () => {
    if (message.trim()) {
      socketIo.emit("msg", message);
      setMessage("");
    }
  };

  useEffect(() => {
    // debugger;
    socketIo.on("msg", (data) => {
      setMessages((msg) => [...msg, data]);
    });
    // return () => {
    //   socketIo.disconnect();
    // };
  },[]);

  

  console.log(messages);


  return (
    <div>
        <br></br>
        <br></br>
        <br></br>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Socket;
