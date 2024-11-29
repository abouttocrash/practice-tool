import {test as base} from "@playwright/test"
import { AsyncLandingPage } from "../PageObjects/landingPage/AsyncLandingPage"
import { AsyncNewTestPage } from "../PageObjects/newTestPage/AsyncNewTestPage"

type MyFixtures = {
    landingPage:AsyncLandingPage 
    newTestPage:AsyncNewTestPage
}

export const test = base.extend<MyFixtures>({
    landingPage: async ({page},use)=>{
        await use(new AsyncLandingPage(page))
    },
    newTestPage: async ({page},use)=>{
        await use(new AsyncNewTestPage(page))
    },
})

export {expect} from "@playwright/test"