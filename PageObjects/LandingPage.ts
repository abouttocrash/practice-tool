import { Page } from "@playwright/test"

export class LandingPage {
    private newTestCTA = '#new-test-cta'
    private readonly page:Page;
    constructor(page?:Page){
        this.page = page!;
    }

    clickNewTestCTA(){
        return cy.get(this.newTestCTA).click()
    }


    //------- async for playwright
    async clickNewTestAsyncCTA(){
        return await this.page.locator(this.newTestCTA).click()
    }
}