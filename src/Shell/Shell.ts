import type { Command } from "../plugins/types";
import type { ParsedCommand } from "./parseCommand";
import { parseCommand } from "./parseCommand";
import { FileSystem } from "../main";

export class Shell {
  public readonly fileSystem: FileSystem;
  private commands: Map<string, Command>;
  private envVars: Record<string, string>;
  private name: string;

  constructor() {
    this.fileSystem = new FileSystem();
    this.commands = new Map<string, Command>();
    this.envVars = {};
    this.name = "ts-shell";
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
    const { command, args } = this.parseCommand(input);
    const plugin = this.commands.get(command);
    if (!plugin) {
      return `${this.name}: command not found: ${command}`;
    }
    const stdout = plugin.execute(args, this);
    return stdout;
  }

  private parseCommand(input: string): ParsedCommand {
    return parseCommand(input);
  }
}
