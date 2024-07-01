import { BashPlugin } from "../types";

export const mkdirPlugin: BashPlugin = {
  name: "mkdir",
  execute: (args, fileSystem) => {
    if (args.length === 0) {
      return "usage: mkdir <directory>";
    }
    const result = fileSystem.addDirectory(args[0]);
    return result
      ? ""
      : `mkdir: cannot create directory ‘${args[0]}’: File exists`;
  },
};
