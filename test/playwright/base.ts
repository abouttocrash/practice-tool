import {test as base} from "@playwright/test"
import { LandingPage } from "../PageObjects/LandingPage"
import { NewTestPage } from "../PageObjects/NewTestPage"

type MyFixtures = {
    landingPage:LandingPage
    newTestPage:NewTestPage
}

export const test = base.extend<MyFixtures>({
    landingPage: async ({page},use)=>{
        await use(new LandingPage(page))
    },
    newTestPage: async ({page},use)=>{
        await use(new NewTestPage(page))
    },
})

export {expect} from "@playwright/test"