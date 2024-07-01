import type { BashPlugin } from "./types";
import { FileSystem } from "../main";

export class Bash {
  private fileSystem: FileSystem;
  private commands: Map<string, BashPlugin>;

  constructor() {
    this.fileSystem = new FileSystem();
    this.commands = new Map<string, BashPlugin>();
  }

  public registerPlugin(plugin: BashPlugin): boolean {
    if (this.commands.has(plugin.name)) {
      console.error(`Command '${plugin.name}' is already registered.`);
      return false;
    }
    this.commands.set(plugin.name, plugin);
    return true;
  }

  public execute(input: string): string {
    const commands = input.split("|").map((cmd) => cmd.trim());
    let stdout = "";

    for (const command of commands) {
      const [cmd, ...args] = command.split(" ");
      const plugin = this.commands.get(cmd);
      if (!plugin) {
        return `Command not found: ${cmd}`;
      }
      stdout = plugin.execute(args, this.fileSystem);
    }

    return stdout;
  }
}
