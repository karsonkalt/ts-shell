import { Command } from "./types";

export const touchCommand: Command = {
  name: "touch",
  description: "Create an empty file",
  execute: (args, bash) => {
    if (args.length === 0) {
      return "usage: touch <filename>";
    }
    const result = bash.fileSystem.addFile(args[0], "");
    return result ? "" : `touch: cannot create file ‘${args[0]}’: File exists`;
  },
};
