//Chat.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:3001");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Escuchar mensajes del servidor
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Limpiar al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []); // Se eliminó la dependencia [messages]

  const handleSendMessage = () => {
    // Enviar mensaje al servidor
    socket.emit("chat message", inputMessage);
    setInputMessage("");
  };

  return (
    <div>
      <div className="chatBox">
        {messages.map((msg, index) => (
          <div key={index}>{`${msg.id}: ${msg.text}`}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
