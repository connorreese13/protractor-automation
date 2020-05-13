describe("Landing Page Validation", () => {
  beforeAll(function() {
    console.log("Launching App...");
  });
  it("Validate URL", function() {
    browser.get("https://angularjs.org/");
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toBe("https://angularjs.org/");
  });
  it("Validate Title", function() {
    browser.get("https://angularjs.org/");
    browser.sleep(2000);
    expect(browser.getTitle()).toBe(
      "AngularJS — Superheroic JavaScript MVW Framewor"
    );
  });
});

describe("Input Field", () => {
  beforeAll(function() {
    console.log("Launching App...");
    browser.waitForAngularEnabled(false);
    browser.get("http://uitestingplayground.com/textinput");
    browser.sleep(2000);
  });
  it("input Field can receive data", () => {
    let input = element(by.className("form-control"));
    let button = element(by.id("updatingButton"));
    input.sendKeys("This is a test");
    button.click();
  });
  it("Button text changes to imput data", () => {
    let button = element(by.id("updatingButton"));
    expect(button.getText()).toEqual("This is a test");
  });
});
