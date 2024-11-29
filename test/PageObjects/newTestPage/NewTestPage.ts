import { locators } from "../locators"

export class NewTestPage {

    constructor(){}

    writeTestName(text:string){
        return cy.get(locators.nameLocator).type(text)
    }

    getSubmittedText(){
        return cy.get(locators.submittedTextLocator)
    }
    
    clickSubmitButton(){
        return cy.get(locators.submitLocator).click()
    }

    writeReqName(text:string){
        return cy.get(locators.reqLocator).type(text)
    }

    getStepInputHeight(areaIndex = 0){
        return cy.get(locators.textAreaLocator).eq(areaIndex)
        .invoke('css','height')
        .should("be.a","string")
        .then(h=>{
            return parseFloat(String(h))
        })
    }
    
    pressEnterInTextarea(areaIndex:number,times = 1){
        for(let i = 0;i < times;i++){
            cy.get(locators.textAreaLocator).eq(areaIndex).type('{enter}')
        }
        return cy.get(locators.textAreaLocator).eq(areaIndex)
    }
}