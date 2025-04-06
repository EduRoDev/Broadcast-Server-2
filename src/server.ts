import { Server, Socket } from "socket.io";

const PORT = 8080;
export const startServer = () => {
  const io = new Server(PORT, {
    cors: {
      origin: "*",
    },
  });

  const clients = new Map<string, Socket>();

  io.on("connection", (socket: Socket) => {
    console.log(`Client connected to server: ${socket.id}`);
    clients.set(socket.id, socket);

    socket.on("msg", (msg: string) => {
      console.log(`message received form client ${socket.id}: ${msg}`);
      clients.forEach((client) => {
        client.emit("msg", msg);
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected from server: ${socket.id}`);
      clients.delete(socket.id);
    });
  });

  console.log(`Server running on port ${PORT}`);

  process.on("SIGINT", () => {
    console.log("Server stopped");
    process.exit(0);
  });
};
