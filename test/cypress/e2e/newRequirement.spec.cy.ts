import { LandingPage } from "../../PageObjects/landingPage/LandingPage"
import { NewRequirementPage } from "../../PageObjects/newRequirement/NewRequirementPage"

describe('New requirement spec', () => {
  const newReqPOM = new NewRequirementPage()
  const landingPagePOM = new LandingPage()
  beforeEach(()=>{
    cy.viewport(1440,900)
    cy.origin('http://localhost:4200',()=>{
      cy.visit("/")
    })
  })

  it("The name of the tab should change to the requirement name once created",()=>{
    landingPagePOM.clickNewTestCTA() 
    
  })
})