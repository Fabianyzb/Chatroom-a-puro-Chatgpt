import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "../src/components/Chat";

const socket = io("http://localhost:3001", {
  withCredentials: true, // Puedes probar con o sin esta línea
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://localhost:5173",
  },
});

// Manejo de eventos de conexión y error
socket.on("connect", () => {
  console.log("Conectado al servidor");
});

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Manejo del evento de mensaje recibido
    socket.on("chat message", (msg) => {
      console.log(`Mensaje recibido en el cliente: ${msg.text}`);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on("error", (error) => {
      console.error("Error en la conexión con el servidor:", error);
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSendMessage = () => {
    socket.emit("chat message", inputMessage);
    setInputMessage("");
  };

  return (
    <div>
      <h1>Chat en Tiempo Real</h1>
      <Chat messages={messages} />
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
}

export default App;
