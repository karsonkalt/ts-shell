import { Shell } from "../main";

export interface Command {
  name: string;
  description: string;
  execute: CommandFunction;
}

export type CommandFunction = (args: string[], shell: Shell) => string;
