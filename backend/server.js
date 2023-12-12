const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 204,
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);

  // Manejo del evento de mensaje
  socket.on("chat message", (msg) => {
    // Emitir el mensaje a todos los clientes conectados
    io.emit("chat message", { id: socket.id, text: msg });
    console.log("Mensaje recibido:", msg);
  });

  // Manejo de desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);
    // Emitir un mensaje de desconexión a todos los clientes
    io.emit("user disconnected", { id: socket.id });
  });
});

io.on("error", (error) => {
  console.error("Error en el servidor de Socket.IO:", error);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
