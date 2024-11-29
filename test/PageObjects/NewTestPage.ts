import { AsyncPage } from "./AsyncPage";

export class NewTestPage extends AsyncPage{
    private nameLocator = '#test-name'
    private reqLocator = '#req-name'
    private submittedTextLocator = '#submitted-text'
    private submitLocator = 'button.main-cta'
    constructor(){super()}

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
 //------------------ async for playwright and selenium

    async writeReqNameAsync(text:string){
        return await this.writeAsync(this.reqLocator, text)
    }

    async writeTestNameAsync(text:string){
        return await this.writeAsync(this.nameLocator, text)
    }

    async clickSubmitButtonAsync(){
        return await this.clickAsync(this.submitLocator)
    }

    async getSubmittedTextAsync(){
        return await this.getTextAsync(this.submittedTextLocator)
    }
}