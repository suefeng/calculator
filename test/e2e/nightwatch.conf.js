require('@babel/core')
var config = require('../../config')

module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  webdriver: {
    start_process: true,
    port: 4444,
    host: 'localhost',
    server_path: require('geckodriver').path,
    cli_args: [
      // very verbose geckodriver logs
      // '-vv'
    ]
  },

  test_settings: {
    default: {
      globals: {
        devServerURL: 'http://localhost:8080/#/'
      }
    },
    safari: {
      desiredCapabilities : {
        browserName : 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false
        }
      },
      webdriver: {
        port: 4445,
        start_process: true,
        server_path: '/usr/bin/safaridriver'
      }
    },
    firefox: {
      desiredCapabilities : {
        browserName : 'firefox'
      },

      webdriver: {
        start_process: true,
        port: 4444,
        server_path: require('geckodriver').path
      }
    },
    chrome: {
      desiredCapabilities : {
        browserName : 'chrome'
      },

      webdriver: {
        start_process: true,
        port: 4444,
        server_path: require('chromedriver').path
      }
    }

    // default: {
    //   globals: {
    //     devServerURL: 'http://localhost:8080/#/'
    //   },
    //   desiredCapabilities : {
    //     browserName : 'firefox',
    //     javascriptEnabled: true,
    //     alwaysMatch: {
    //       acceptInsecureCerts: true,
    //       'moz:firefoxOptions': {
    //         args: [
    //           // '-headless',
    //           // '-verbose'
    //         ],
    //       }
    //     }
    //   }
    // }
  }
};


/*
//http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.gecko.driver': require('geckodriver').path,
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}*/
