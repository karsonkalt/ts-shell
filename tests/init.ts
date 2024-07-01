import {
  Bash,
  cdPlugin,
  echoPlugin,
  lsPlugin,
  mkdirPlugin,
  pwdPlugin,
  touchPlugin,
} from "../src/main";

const bash = new Bash();

bash.registerPlugin(cdPlugin);
bash.registerPlugin(mkdirPlugin);
bash.registerPlugin(lsPlugin);
bash.registerPlugin(echoPlugin);
bash.registerPlugin(touchPlugin);
bash.registerPlugin(pwdPlugin);

export { bash };
