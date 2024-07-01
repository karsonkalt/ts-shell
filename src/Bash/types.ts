import { FileSystem } from "../main";

export type CommandFunction = (
  args: string[],
  fileSystem: FileSystem
) => string;

export interface BashPlugin {
  name: string;
  execute: CommandFunction;
}
