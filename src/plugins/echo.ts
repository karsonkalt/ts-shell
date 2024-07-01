import { BashPlugin } from "../types";

export const echoPlugin: BashPlugin = {
  name: "echo",
  execute: (args, fileSystem) => {
    return args.join(" ");
  },
};
