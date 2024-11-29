import { locators } from "../locators"

export class LandingPage{
    constructor(){}

    clickNewTestCTA(){
        return cy.get(locators.newTestCTA).click()
    }
}