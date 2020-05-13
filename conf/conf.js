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
    var jasmineReporters = require("jasmine-reporters");
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: "./",
        filePrefix: "xmlresults"
      })
    );

    var AllureReporter = require("jasmine-allure-reporter");
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "allure-results"
      })
    );

    var fs = require("fs-extra");

    fs.emptyDir("screenshots/", function(err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
      specDone: function(result) {
        if (result.status == "failed") {
          browser.getCapabilities().then(function(caps) {
            var browserName = caps.get("browserName");

            browser.takeScreenshot().then(function(png) {
              var stream = fs.createWriteStream(
                "screenshots/" + browserName + "-" + result.fullName + ".png"
              );
              stream.write(new Buffer(png, "base64"));
              stream.end();
            });
          });
        }
      }
    });
  },
  //HTMLReport called once tests are finished
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function(caps) {
      browserName = caps.get("browserName");
      browserVersion = caps.get("version");
      platform = caps.get("platform");

      var HTMLReport = require("protractor-html-reporter-2");

      testConfig = {
        reportTitle: "Protractor Test Execution Report",
        outputPath: "./",
        outputFilename: "ProtractorTestReport",
        screenshotPath: "./screenshots",
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from("xmlresults.xml", testConfig);
    });
  }
};
