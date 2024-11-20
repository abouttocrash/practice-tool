import { Page } from "@playwright/test";

export class NewTestPage{
    private nameLocator = '#test-name'
    private reqLocator = '#req-name'
    private submittedTextLocator = '#submitted-text'
    private submitLocator = 'button.main-cta'
    private page:Page
    constructor(page?:Page){
        this.page = page!
    }

    writeTestName(text:string){
        return cy.get(this.nameLocator).type(text)
    }

    getSubmittedText(){
        return cy.get(this.submittedTextLocator)
    }
    
    clickSubmitButton(){
        return cy.get(this.submitLocator).click()
    }

    writeReqName(text:string){
        return cy.get(this.reqLocator).type(text)
    }
 //------------------ async for playwright
    async writeReqNameAsync(text:string){
        return await this.page.locator(this.reqLocator).fill(text)
    }

    async writeTestNameAsync(text:string){
        return await this.page.locator(this.nameLocator).fill(text)
    }

    async clickSubmitButtonAsync(){
        return await this.page.locator(this.submitLocator).click()
    }

    async getSubmittedTextAsync(){
        return await this.page.locator(this.submittedTextLocator).textContent()
    }
}