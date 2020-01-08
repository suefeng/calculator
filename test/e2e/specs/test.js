// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Test calculator is present, perform -(5+3*9/3-2) through button clicks': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.calculator')
      .click('#n5')
      .click('#add')
      .click('#n3')
      .click('#multiply')
      .click('#n9')
      .click('#divide')
      .click('#n3')
      .click('#subtract')
      .click('#n2')
      .pause('500')
      .click('#equal')
      .click('#plusMinus')
      .getValue('.input', function (result) {
        browser.assert.equal(result.value, '-12')
      })
  },
  'Perform 6*3/2, clear, 3*9, view history, paste 6*3/2 from history': function (browser) {
    browser
      .click('#plusMinus')
      .click('#divide')
      .click('#n3')
      .click('#multiply')
      .click('#n9')
      .click('#equal')
      .click('#h')
      .pause('500')
      .click('.copyPaste:first-of-type')
      .pause('500')
      .getValue('.input', function (result) {
        browser.assert.equal(result.value, '5+3*9/3-2')
      })
      .click('#multiply')
      .click('#n3')
      .click('#equal')
      .getValue('.input', function (result) {
        browser.assert.equal(result.value, '8')
      })
  },
  'Keyboard 3.14 ma, c, mr * mr = 9.8596': function (browser) {
    browser
      .sendKeys('form', 'q')
      .sendKeys('form', 'c')
      .sendKeys('form', '3')
      .sendKeys('form', '.')
      .sendKeys('form', '1')
      .sendKeys('form', '4')
      .sendKeys('form', 'm')
      .sendKeys('form', 'a')
      .sendKeys('form', 'c')
      .sendKeys('form', 'm')
      .sendKeys('form', 'r')
      .pause('500')
      .getValue('.input', function (result) {
        browser.assert.equal(result.value, '3.14')
      })
      .sendKeys('form', '*')
      .sendKeys('form', 'm')
      .sendKeys('form', 'r')
      .pause('500')
      .sendKeys('form', browser.Keys.ENTER)
      .pause('500')
      .getValue('.input', function (result) {
        browser.assert.equal(result.value, '9.8596')
      })
      .end()
  }
}
