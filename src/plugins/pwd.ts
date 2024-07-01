import { BashPlugin } from "./types";

export const pwdPlugin: BashPlugin = {
  name: "pwd",
  execute: (args, bash) => {
    return bash.fileSystem.getCurrentPath();
  },
};
