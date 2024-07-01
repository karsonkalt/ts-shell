import { BashPlugin } from "./types";

export const touchPlugin: BashPlugin = {
  name: "touch",
  execute: (args, bash) => {
    if (args.length === 0) {
      return "usage: touch <filename>";
    }
    const result = bash.fileSystem.addFile(args[0], "");
    return result ? "" : `touch: cannot create file ‘${args[0]}’: File exists`;
  },
};
