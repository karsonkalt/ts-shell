import { Command } from "./types";

export const echoCommand: Command = {
  name: "echo",
  description: "Print the arguments to the standard output",
  execute: (args, bash) => {
    return args.join(" ");
  },
};
