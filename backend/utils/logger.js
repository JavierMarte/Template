const logSpecs = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
  FATAL: "FATAL",
};

const logColors = {
  INFO: "\u001b[0m",
  WARN: "\u001b[33m",
  ERROR: "\u001b[31m",
  DEBUG: "\u001b[0m",
  FATAL: "\u001b[31m",
};

const logLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4,
};

const logFunctions = {
  INFO: console.info,
  WARN: console.warn,
  ERROR: console.error,
  DEBUG: console.debug,
  FATAL: console.error,
};

class Logger {
  // Define the name of the logger
  constructor(name) {
    this.name = name;
  }

  generateContext(level) {
    return `\u001b[0m\u001b[35m${new Date().toLocaleTimeString()}  ${
      this.name
    } \u001b[1m${logColors[level]}${level}:\u001b[0m${logColors[level]}`;
  }

  print(level, ...args) {
    if (logLevels[level] < process.env.LOG_LEVEL) {
      return;
    }
    logFunctions[level](this.generateContext(level), ...args);
  }

  log(...args) {
    this.print(logSpecs.INFO, ...args);
  }

  warn(...args) {
    this.print(logSpecs.WARN, ...args);
  }

  error(...args) {
    const error = new Error();
    const errorFunction = error.stack
      .split(/\n/)[2]
      .trim()
      .split(/\s+/)[1]
      .replace(/\(/, "");
    this.print(logSpecs.ERROR, `Error function triggered at ${this.name}/${errorFunction}.`);
    this.print(logSpecs.ERROR, ...args);
  }

  debug(...args) {
    this.print(logSpecs.DEBUG, ...args);
  }

  fatal(...args) {
    this.print(logSpecs.FATAL, ...args);
  }

  ws(msg) {
    const jsonParsed = JSON.parse(msg);
    const level = jsonParsed.level;
    const message = jsonParsed.message;
    const name = jsonParsed.name;
    if (logLevels[level] < process.env.LOG_LEVEL) {
      return;
    }
    logFunctions[level](
      `\u001b[0m\u001b[35m${new Date().toLocaleTimeString()}  ${
        this.name
      }/${name} \u001b[1m${logColors[level]}${level}:\u001b[0m${
        logColors[level]
      }`,
      message.join(" ")
    );
  }
}

function log(originalFunction) {
  const error = new Error();
  const callerFunction = error.stack
    .split(/\n/)[2]
    .trim()
    .split(/\s+/)[1]
    .replace(/\(/, "");
  const callerFunctionCaller = error.stack
    .split(/\n/)[3]
    .trim()
    .split(/\s+/)[1]
    .replace(/\(/, "");
  const logger = new Logger(`${callerFunction}/${originalFunction.name}`);
  logger.log(`Function called by ${callerFunctionCaller}/${callerFunction}`);
  return originalFunction;
}

module.exports = {
  Logger,
  log,
};
