import { BashPlugin } from "./types";

export const cdPlugin: BashPlugin = {
  name: "cd",
  execute: (args, bash) => {
    if (args.length === 0) {
      return "usage: cd <directory>";
    }
    const result = bash.fileSystem.changeDirectory(args[0]);
    return result ? "" : `cd: no such file or directory: ${args[0]}`;
  },
};
