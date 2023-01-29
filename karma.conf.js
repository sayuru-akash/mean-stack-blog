const puppeteer = require("puppeteer");
module.exports = async function (config) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  process.env.CHROME_BIN = require("puppeteer").executablePath();
  config.set({
    frameworks: ["mocha", "chai"],
    browsers: ["ChromeHeadless", "Chrome", "ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
      ChromeHeadless: {
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
