import { Command } from "./types";

export const mkdirCommand: Command = {
  name: "mkdir",
  description: "Create a new directory",
  execute: (args, bash) => {
    if (args.length === 0) {
      return "usage: mkdir <directory>";
    }
    const result = bash.fileSystem.addDirectory(args[0]);
    return result
      ? ""
      : `mkdir: cannot create directory ‘${args[0]}’: File exists`;
  },
};
