import { LandingPage } from "../../PageObjects/landingPage/LandingPage"
import { NewTestPage } from "../../PageObjects/newTestPage/NewTestPage"

describe('New test spec', () => {
  const newPagePOM = new NewTestPage()
  const landingPagePOM = new LandingPage()
  beforeEach(()=>{
    cy.viewport(1440,900)
    cy.origin('http://localhost:4200',()=>{
      cy.visit("/")
    })
  })
 
  it('The user should be able to create a test', () => {
    // landingPagePOM.clickNewTestCTA()
    // newPagePOM.writeTestName("Test name")
    // newPagePOM.writeReqName("Req name")
    // newPagePOM.clickSubmitButton()
    // newPagePOM.getSubmittedText().should("have.text","Test name")
  })

  it("overflow on step fields should not change its size",()=>{
    // landingPagePOM.clickNewTestCTA()
    // newPagePOM.getStepInputHeight().then(ogHeight=>{
    //   newPagePOM.pressEnterInTextarea(0,3)
    //   newPagePOM.getStepInputHeight().should("be.closeTo",ogHeight,0.1)
    // })
  })

  
})