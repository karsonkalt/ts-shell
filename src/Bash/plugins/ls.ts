import { BashPlugin } from "../types";

export const lsPlugin: BashPlugin = {
  name: "ls",
  execute: (args, fileSystem) => {
    const children = fileSystem.getChildren();
    return children.map((child) => child.name).join(" ");
  },
};
