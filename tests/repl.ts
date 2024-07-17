// import into ts-node repl for testing

import {
  Shell,
  cdPlugin,
  echoPlugin,
  lsPlugin,
  mkdirPlugin,
  pwdPlugin,
  touchPlugin,
  exportPlugin,
} from "../src/main";

const bash = new Shell();

bash.register(cdPlugin);
bash.register(mkdirPlugin);
bash.register(lsPlugin);
bash.register(echoPlugin);
bash.register(touchPlugin);
bash.register(pwdPlugin);
bash.register(exportPlugin);

export { bash };
