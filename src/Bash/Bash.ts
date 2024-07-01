import type { BashPlugin } from "../plugins/types";
import { FileSystem } from "../main";

export class Bash {
  public readonly fileSystem: FileSystem;
  private commands: Map<string, BashPlugin>;
  private environmentVariables: Record<string, string>;

  constructor() {
    this.fileSystem = new FileSystem();
    this.commands = new Map<string, BashPlugin>();
    this.environmentVariables = {};
  }

  public setEnvVariable(key: string, value: string): boolean {
    this.environmentVariables[key] = value;
    return true;
  }

  public getEnvVariable(key: string): string | undefined {
    return this.environmentVariables[key];
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
      stdout = plugin.execute(args, this);
    }

    return stdout;
  }
}
