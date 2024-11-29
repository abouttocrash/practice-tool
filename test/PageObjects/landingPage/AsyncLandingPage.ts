import { Page } from "@playwright/test"
import { AsyncPage } from "../AsyncPage"
import { locators } from "../locators"

export class AsyncLandingPage extends AsyncPage{
    
    constructor(page?:Page){super(page)}

    async clickNewTestCTAAsync(){
        return await this.clickAsync(locators.newTestCTA)
    }
}