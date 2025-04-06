import io from "socket.io-client";
import * as readline from "readline";

export const connectToServer = () => {
  const socket = io("http://localhost:8080", {
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promtMessage = () => {
    rl.question(">>", (input) => {
      if (input.toLocaleLowerCase().includes("exit")) {
        socket.disconnect();
        rl.close();
        return;
      }
      socket.emit("msg", input);
      promtMessage();
    });
  };

  socket.on("connect", () => {
    console.log("Connected to server");
    promtMessage();
  });

  socket.on("msg", (msg: string) => {
    console.log("\n<< Broadcast: " + msg);
    rl.prompt();
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
    rl.close();
  });

  socket.on("error", (err: { message: string }) => {
    console.log("Error: " + err.message);
    rl.close();
  });
};
