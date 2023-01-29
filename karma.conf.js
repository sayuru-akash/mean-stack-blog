module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "chai"],
    browsers: ["ChromeHeadless"],
    reporters: ["progress"],
    basePath: process.cwd(),
    colors: true,
    files: [
      "../**/*.js", // or you can put your test bundle here
    ],
    port: 9999,
    singleRun: true,
    concurrency: Infinity,
  });
};
