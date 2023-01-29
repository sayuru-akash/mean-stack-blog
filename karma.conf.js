process.env.CHROME_BIN = "/usr/bin/google-chrome";
module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless", "Chrome", "ChromeHeadlessCI"],
    customLaunchers: {
      ChromeHeadless: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
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
