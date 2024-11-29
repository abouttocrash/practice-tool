import { Page } from "@playwright/test";
import { AsyncPage } from "../AsyncPage";
import { locators } from "../locators";
export class AsyncNewTestPage extends AsyncPage{
    
    constructor(page?:Page){super(page)}


    async writeReqNameAsync(text:string){
        return await this.writeAsync(locators.reqLocator, text)
    }

    async writeTestNameAsync(text:string){
        return await this.writeAsync(locators.nameLocator, text)
    }

    async clickSubmitButtonAsync(){
        return await this.clickAsync(locators.submitLocator)
    }

    async getSubmittedTextAsync(){
        return await this.getTextAsync(locators.submittedTextLocator)
    }
}