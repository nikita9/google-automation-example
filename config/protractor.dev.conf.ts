import { SpecReporter } from 'jasmine-spec-reporter';
import { browser, Config } from 'protractor';
import * as DescribeFailureReporter from 'protractor-stop-describe-on-failure';

// tslint:disable object-literal-sort-keys
export let config: Config = {
  directConnect: true,
  framework: 'jasmine2',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 90 * 1000,
    showColors: true
  },

  capabilities: {
    browserName: 'chrome',
    maxInstances: 1,
    shardTestFiles: true,
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=1280x1696']
    }
  },
  proxy: {
    // put here your proxy account
    proxyType: 'MANUAL',
    httpProxy: 'http://lum-customer-denovolab-zone-static:qcetue9smc83@zproxy.lum-superproxy.io:22225'
  },
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false);

    jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));
    jasmine.getEnv().addReporter(new SpecReporter());
  },

  SELENIUM_PROMISE_MANAGER: false,
  specs: [
    '../test/*.js'
  ]
};
