const fs = require("fs");
const path = require("path");

const targetDir = process.argv[2]; // TODO I don't understand why this is 2 fully, I know it's bash-something

if (!targetDir) {
  console.error("Please provide a directory to clean.");
  process.exit(1);
}

const distPath = path.join(__dirname, "..", targetDir);

fs.rm(distPath, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(`Failed to remove ${targetDir} directory: ${err.message}`);
  } else {
    console.log(`${targetDir} directory cleaned`);
  }
});
