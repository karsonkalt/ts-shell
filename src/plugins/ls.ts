import { BashPlugin } from "./types";

export const lsPlugin: BashPlugin = {
  name: "ls",
  execute: (args, bash) => {
    const children = bash.fileSystem.getChildren();
    return children.map((child) => child.name).join(" ");
  },
};
