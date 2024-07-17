import { Command } from "./types";

export const lsCommand: Command = {
  name: "ls",
  description: "List directory contents",
  execute: (args, bash) => {
    const children = bash.fileSystem.getChildren();
    return children.map((child) => child.name).join(" ");
  },
};
