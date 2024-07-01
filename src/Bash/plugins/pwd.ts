import { BashPlugin } from "../types";

export const pwdPlugin: BashPlugin = {
  name: "pwd",
  execute: (args, fileSystem) => {
    return fileSystem.getCurrentPath();
  },
};
