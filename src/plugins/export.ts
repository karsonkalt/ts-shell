import { BashPlugin } from "./types";

export const exportPlugin: BashPlugin = {
  name: "export",
  execute: (args: string[], bash: any) => {
    if (args.length === 0) {
      return "usage: export <variable>=<value>";
    }

    const fullArgs = args.join(" ");
    if (!fullArgs.includes("=")) {
      return "Error: Invalid format. Correct format is <variable>=<value>";
    }

    const [variable, ...valueParts] = fullArgs.split("=");
    let value = valueParts.join("="); // Join back in case there are '=' in the value

    if (
      (value.startsWith(`"`) && value.endsWith(`"`)) ||
      (value.startsWith(`'`) && value.endsWith(`'`))
    ) {
      value = value.substring(1, value.length - 1);
    }

    bash.setEnvVariable(variable, value);

    return "";
  },
};
