import { Page } from "@playwright/test";
import { By, until, WebDriver } from "selenium-webdriver";

export class AsyncPage{
    private page!:Page
    private driver!:WebDriver

    constructor(){}

    setPage(page:Page){this.page = page;}

    setDriver(driver:WebDriver){this.driver = driver}

    protected async clickAsync(locator:string){
        if(this.driver)
            return await this.driver.findElement(By.css(locator)).click()
        else
            return await this.page.locator(locator).click()
    }

    protected async writeAsync(locator:string,text:string){
        if(this.driver){
            return await this.driver.findElement(By.css(locator)).sendKeys(text)
        }
        else
            return await this.page.locator(locator).fill(text)
    }

    protected async getTextAsync(locator:string){
        if(this.driver){
            await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.css(locator))))
            const element = await this.driver.findElement(By.css(locator))
            return await element.getText()
        }
        else
            return await this.page.locator(locator).textContent()
    }
}