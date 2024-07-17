import { Command } from "./types";

export const pwdCommand: Command = {
  name: "pwd",
  description: "Print the current working directory",
  execute: (args, bash) => {
    return bash.fileSystem.getCurrentPath();
  },
};
