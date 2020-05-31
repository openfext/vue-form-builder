global.console = {
  log: console.log,
  error: console.error,
  warn: jest.fn(),
  info: console.info,
  debug: console.debug
};
