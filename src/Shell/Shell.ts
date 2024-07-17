import type { Command } from "../plugins/types";
import { FileSystem } from "../main";

export class Shell {
  public readonly fileSystem: FileSystem;
  private commands: Map<string, Command>;
  private envVars: Record<string, string>;

  constructor() {
    this.fileSystem = new FileSystem();
    this.commands = new Map<string, Command>();
    this.envVars = {};
  }

  public setEnvVar(key: string, value: string): void {
    this.envVars[key] = value;
  }

  public getEnvVar(key: string): string | undefined {
    return this.envVars[key];
  }

  public register(command: Command): boolean {
    if (this.commands.has(command.name)) {
      return false;
    }
    this.commands.set(command.name, command);
    return true;
  }

  public execute(input: string): string {
    let stdout = "";

    const [cmd, ...args] = input.split(" ");
    const plugin = this.commands.get(cmd);
    if (!plugin) {
      return `Command not found: ${cmd}`;
    }
    stdout = plugin.execute(args, this);

    return stdout;
  }
}
