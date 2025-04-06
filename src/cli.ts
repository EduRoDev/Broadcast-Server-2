import { Command } from "commander";
import "./client";
import "./server";
import { startServer } from "./server";
import { connectToServer } from "./client";

const program = new Command();

program
  .name("broadcast-server")
  .description("A simple broadcast server")
  .version("1.0.0");

program
  .command("start")
  .description("Start the server")
  .action(() => {
    console.log("Starting server...");
    startServer();
  });

program
  .command("connect")
  .description("Connect to the server")
  .action(() => {
    console.log("Connecting to server...");
    connectToServer();
  });

program.parse(process.argv);
