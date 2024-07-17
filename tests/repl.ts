// import into ts-node repl for testing

import {
  Shell,
  cdCommand,
  echoCommand,
  lsCommand,
  mkdirCommand,
  pwdCommand,
  touchCommand,
  exportCommand,
} from "../src/main";

const bash = new Shell();

bash.register([
  cdCommand,
  echoCommand,
  lsCommand,
  mkdirCommand,
  pwdCommand,
  touchCommand,
  exportCommand,
]);

export { bash };
