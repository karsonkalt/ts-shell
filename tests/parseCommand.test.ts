import { parseCommand } from "../src/Shell/parseCommand";

describe("parseCommand", () => {
  it("should extract the command name", () => {
    const result = parseCommand("command arg1 arg2 arg3");
    expect(result.command).toBe("command");
  });

  it("should extract the command name with leading spaces", () => {
    const result = parseCommand("   command arg1 arg2 arg3");
    expect(result.command).toBe("command");
  });

  it("should correctly extract the arguments from a string with multiple arguments", () => {
    const result = parseCommand("command arg1 arg2 arg3");
    expect(result.args).toEqual(["arg1", "arg2", "arg3"]);
  });

  it("should correctly extract the arguments from a string with multiple arguments with extra spaces", () => {
    const result = parseCommand("command arg1   arg2  arg3");
    expect(result.args).toEqual(["arg1", "arg2", "arg3"]);
  });

  it("should correctly extract arguments with trailing whitespace", () => {
    const result = parseCommand("command arg1 arg2 arg3   ");
    expect(result.args).toEqual(["arg1", "arg2", "arg3"]);
  });

  it("should extract the command name if wrapped in double quotes", () => {
    const result = parseCommand('"command" arg1 arg2 arg3');
    expect(result.command).toBe("command");
  });

  it("should extract the command name if wrapped in single quotes", () => {
    const result = parseCommand("'command' arg1 arg2 arg3");
    expect(result.command).toBe("command");
  });

  it("should separate arguments if wrapped in double quotes", () => {
    const result = parseCommand('command "arg1 arg2" arg3');
    expect(result.args).toEqual(["arg1 arg2", "arg3"]);
  });

  it("should separate arguments if wrapped in single quotes", () => {
    const result = parseCommand("command 'arg1 arg2' arg3");
    expect(result.args).toEqual(["arg1 arg2", "arg3"]);
  });

  //   it("should handle escaped double quotes within double quoted strings", () => {
  //     const result = parseCommand('command "arg1 \\"arg2\\"" arg3');
  //     expect(result.args).toEqual(['arg1 "arg2"', "arg3"]);
  //   });

  //   it("should handle escaped single quotes within single quoted strings", () => {
  //     const result = parseCommand("command 'arg1 \\'arg2\\'' arg3");
  //     expect(result.args).toEqual(["arg1 'arg2'", "arg3"]);
  //   });

  //   it("should handle arguments with mixed quotes", () => {
  //     const result = parseCommand("command \"arg1 'arg2'\" arg3");
  //     expect(result.args).toEqual(["arg1 'arg2'", "arg3"]);
  //   });

  it("should handle empty arguments in double quotes", () => {
    const result = parseCommand('command "" arg1');
    expect(result.args).toEqual(["", "arg1"]);
  });

  //   it("should handle empty arguments in single quotes", () => {
  //     const result = parseCommand("command '' arg1");
  //     expect(result.args).toEqual(["", "arg1"]);
  //   });

  //   it("should handle escaped spaces in unquoted arguments", () => {
  //     const result = parseCommand("command arg\\ 1 arg2");
  //     expect(result.args).toEqual(["arg 1", "arg2"]);
  //   });

  //   it("should handle special characters in arguments", () => {
  //     const result = parseCommand("command arg1! arg2@ arg3#");
  //     expect(result.args).toEqual(["arg1!", "arg2@", "arg3#"]);
  //   });

  //   it("should handle combined quoted parts in arguments", () => {
  //     const result = parseCommand("command \"arg1\"'arg2' arg3");
  //     expect(result.args).toEqual(["arg1arg2", "arg3"]);
  //   });

  //   it("should handle backslash escaping special characters", () => {
  //     const result = parseCommand("command arg\\! arg\\@ arg\\#");
  //     expect(result.args).toEqual(["arg!", "arg@", "arg#"]);
  //   });

  //   it("should handle backslash escaping quotes", () => {
  //     const result = parseCommand("command arg\\\" arg\\'");
  //     expect(result.args).toEqual(['arg"', "arg'"]);
  //   });

  //   it("should handle command substitution with backticks", () => {
  //     const result = parseCommand("command `echo test` arg2");
  //     expect(result.args).toEqual(["test", "arg2"]);
  //   });

  //   it("should handle command substitution with $()", () => {
  //     const result = parseCommand("command $(echo test) arg2");
  //     expect(result.args).toEqual(["test", "arg2"]);
  //   });

  //   // TODO env variables

  //   it("should handle comments", () => {
  //     const result = parseCommand("command arg1 arg2 # this is a comment");
  //     expect(result.args).toEqual(["arg1", "arg2"]);
  //   });

  //   it("should handle multiple commands in one line", () => {
  //     const result = parseCommand("command1 arg1; command2 arg2");
  //     expect(result).toEqual([
  //       { command: "command1", args: ["arg1"] },
  //       { command: "command2", args: ["arg2"] },
  //     ]);
  //   });

  //   it("should handle input redirection", () => {
  //     const result = parseCommand("command < input.txt");
  //     expect(result.args).toEqual(["<", "input.txt"]);
  //   });

  //   it("should handle output redirection", () => {
  //     const result = parseCommand("command arg1 > output.txt");
  //     expect(result.args).toEqual(["arg1", ">", "output.txt"]);
  //   });

  //   it("should handle append output redirection", () => {
  //     const result = parseCommand("command arg1 >> output.txt");
  //     expect(result.args).toEqual(["arg1", ">>", "output.txt"]);
  //   });

  //   it("should handle pipelines", () => {
  //     const result = parseCommand("command1 arg1 | command2 arg2");
  //     expect(result).toEqual([
  //       { command: "command1", args: ["arg1"] },
  //       { command: "command2", args: ["arg2"] },
  //     ]);
  //   });

  //   it("should handle AND operator", () => {
  //     const result = parseCommand("command1 arg1 && command2 arg2");
  //     expect(result).toEqual([
  //       { command: "command1", args: ["arg1"] },
  //       { command: "command2", args: ["arg2"] },
  //     ]);
  //   });

  //   it("should handle OR operator", () => {
  //     const result = parseCommand("command1 arg1 || command2 arg2");
  //     expect(result).toEqual([
  //       { command: "command1", args: ["arg1"] },
  //       { command: "command2", args: ["arg2"] },
  //     ]);
  //   });
});
