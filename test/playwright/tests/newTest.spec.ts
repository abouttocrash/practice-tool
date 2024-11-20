import { test, expect } from '../base';
  test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200")
  })

  test("The user should be able to create a test",async ({landingPage,newTestPage,page})=>{
    await landingPage.clickNewTestAsyncCTA()
    await newTestPage.writeTestNameAsync("Test name")
    await newTestPage.writeReqNameAsync("Req name")
    await newTestPage.clickSubmitButtonAsync()
    let text = await newTestPage.getSubmittedTextAsync()
    expect(text).toEqual("Test name Req name")
  })

