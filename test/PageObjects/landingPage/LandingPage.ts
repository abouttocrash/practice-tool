import { locators } from "../locators"

export class LandingPage{
    constructor(){}

    clickNewTestCTA(){
        return cy.get(locators.newTestCTA).click()
    }

    clickNewReqCTA(){
        return cy.get(locators.newReqCTA).click()
    }

    getActiveTabText(){
        return cy.get(locators.activeTab).find(".mdc-tab__text-label")
    }
}