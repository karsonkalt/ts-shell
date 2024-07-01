import { BashPlugin } from "./types";

export const echoPlugin: BashPlugin = {
  name: "echo",
  execute: (args, bash) => {
    return args.join(" ");
  },
};
