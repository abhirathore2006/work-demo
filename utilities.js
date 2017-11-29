var colors = require("colors");

function setColorTheme() {
  colors.setTheme({
    silly: "rainbow",
    input: "grey",
    verbose: "cyan",
    prompt: "grey",
    info: "green",
    data: "grey",
    help: "cyan",
    warn: "yellow",
    debug: "blue",
    error: "red",
  });
}

const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean, defaultOption: false },
  { name: "url", type: String, defaultOption: true },
];

function printHelp() {
  console.log(
    `
    Find All Media Urls on a Webpage \n
    Usage: node index.js  --url weburl [ -v|--verbose]  \n
    Options: \n
    -v, --verbose     runs in verbose mode   \n
    --url             web url e.g. http://google.com \n
    `.help,
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getLogger(isVerbose) {
  if (isVerbose) {
    return console.log;
  }
  return () => {};
}

module.exports = {
  optionDefinitions,
  getLogger,
  printHelp,
  sleep,
  setColorTheme,
};
