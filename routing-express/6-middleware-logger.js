// configurable middleware function
const logger = (options) => (request, response, next) => {
  if (typeof options === "object" && options !== null && options.enable) {
    console.log(
      "status code:",
      response.statusCode,
      "URL:",
      request.originalUrl
    );
  }
  next();
};

module.exports = logger;
