import { Builder, WebDriver } from "selenium-webdriver";

import { describe,it,before,beforeEach,after,afterEach } from "mocha"
import { expect } from "chai";
import path from 'path';
import { fileURLToPath } from 'url';
import * as firefox from 'selenium-webdriver/firefox';
import { LandingPage } from "../../PageObjects/LandingPage";
import { NewTestPage } from "../../PageObjects/NewTestPage";

  describe("Selenium test",function(){

    let driver:WebDriver
    let landingPagePOM:LandingPage
    let newTestPagePOM:NewTestPage
    //TODO: this should be part of a config/setup file
    before(async()=>{
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const geckoDriverPath = path.join(__dirname, "../drivers/geckodriver");
      const serviceBuilder = await new firefox.ServiceBuilder(geckoDriverPath)
      driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxService(serviceBuilder)
        .build();
        
    })

    beforeEach(async()=>{
      landingPagePOM = new LandingPage()
      newTestPagePOM = new NewTestPage();
      landingPagePOM.setDriver(driver)
      newTestPagePOM.setDriver(driver)
      await driver.get("http://localhost:4200")
    })


    it('The user should be able to create a test', async function()  {
      await landingPagePOM.clickNewTestCTAAsync()
      await newTestPagePOM.writeTestNameAsync("Test name")
      await newTestPagePOM.writeReqNameAsync("Req name")
      await newTestPagePOM.clickSubmitButtonAsync()
      let text = await newTestPagePOM.getSubmittedTextAsync()
      expect(text).to.equal("Test name")
    })

    afterEach(async()=>{
        await driver.close()
    })

    after(async function(){
      // await driver.quit()
    })
  })


