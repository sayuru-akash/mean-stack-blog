module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless"],
    customLaunchers: {
      ChromeHeadless: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    plugins: [require("karma-chrome-launcher"), require("karma-jasmine")],
    reporters: ["progress"],
    basePath: process.cwd(),
    colors: true,
    files: [
      "*.js", // or you can put your test bundle here
    ],
    port: 9999,
    singleRun: true,
    concurrency: Infinity,
  });
};
