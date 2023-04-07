/**
 * Not implemented yet
 */

const log = (message: string, ...args: unknown[]): void => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, ...args);
  }
};

const error = (err: any, ...args: unknown[]): void => {
  if (process.env.NODE_ENV === "development") {
    console.error(err, ...args);
  }
};

const tracer = {
  log,
  error,
};

export default tracer;
