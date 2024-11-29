import { AsyncPage } from "./AsyncPage";

export class LandingPage extends AsyncPage{
    private newTestCTA = '#new-test-cta'
    
    constructor(){super()}

    clickNewTestCTA(){
        return cy.get(this.newTestCTA).click()
    }


    //------- async for playwright and selenium
    
    async clickNewTestCTAAsync(){
        return await this.clickAsync(this.newTestCTA)
    }
}