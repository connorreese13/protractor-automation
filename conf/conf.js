exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["..//test-cases//spec.js"]
};

exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  capabilities: {
    browserName: "chrome"
  },
  specs: ["..//test-cases//spec.js"],
  framework: "jasmine2",
  onPrepare: function() {
    var jasmineReporters = require("/Users/connorreese/workspace/protractor-automation/node_modules/jasmine-reporters");
    jasmine
      .getEnv()
      .addReporter(new jasmineReporters.JUnitXmlReporter(null, true, true));
  }
};
