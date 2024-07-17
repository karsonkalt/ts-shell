export interface ParsedCommand {
  command: string;
  args: string[];
}

export function parseCommand(input: string): ParsedCommand {
  const regex = /"([^"]+)"|'([^']+)'|(\S+)/g; // matches words or quoted substrings

  let match;
  const parts: string[] = [];

  while ((match = regex.exec(input)) !== null) {
    if (match[1]) {
      parts.push(match[1]); // double quotes
    } else if (match[2]) {
      parts.push(match[2]); // single quotes
    } else if (match[3]) {
      parts.push(match[3]); // no quotes
    }
  }

  const [command, ...args] = parts;
  return {
    command,
    args,
  };
}
