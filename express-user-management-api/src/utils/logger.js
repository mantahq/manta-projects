export const logger = {
  info: (message, data = null) => {
    console.log(
      `[INFO] ${new Date().toISOString()} - ${message}`,
      data ? JSON.stringify(data) : ""
    );
  },

  error: (message, error = null) => {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      error ? error.stack : ""
    );
  },
};
