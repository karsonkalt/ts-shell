import { Bash } from "../main";

export interface BashPlugin {
  name: string;
  execute: CommandFunction;
}

export type CommandFunction = (args: string[], bash: Bash) => string;
