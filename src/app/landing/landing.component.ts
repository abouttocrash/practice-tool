import { Component, ViewContainerRef, viewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs'; 
import { FormControl } from '@angular/forms';
import { NewTestComponent } from '../new-test/new-test.component';
import { TestListComponent } from '../test-list/test-list.component';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import { NewRequirementComponent } from '../new-requirement/new-requirement.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatIconModule,MatListModule,CommonModule, MatButton,RouterLink,MatTabsModule,NewTestComponent,TestListComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  tabs:string[] = [];
  componentTabs:NewTestComponent|TestListComponent[] = []
  vcr = viewChildren('tabcontainer',{read:ViewContainerRef})
  selected = new FormControl(0);


  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }
  async showList(){
    const tab = this.tabs.indexOf("Test list")
    if(tab == -1){
      this.tabs.push("Test list")
      await this.createXButton()
      this.vcr()[this.tabs.length-1]?.createComponent(TestListComponent)
      return
    }
    this.selected.setValue(tab);
  }
  async newTest(){
    this.tabs.push("New test")
    await this.createXButton()
    this.vcr()[this.tabs.length-1]?.createComponent(NewTestComponent)
  }

  async newRequirement(){
    this.tabs.push("New requirement")
    await this.createXButton()
    this.vcr()[this.tabs.length-1]?.createComponent(NewRequirementComponent)
  }

  //TODO: remove this wait
  timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createXButton(){
    const sel = `#mat-tab-label-0-${this.tabs.length-1} span.mdc-tab__content`
    const button = document.createElement("mat-icon")
    button.setAttribute("id",sel+"-close")
    button.setAttribute("index",this.tabs.length-1+"")
    button.className = 'mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color tab-close'
    button.textContent = 'close'
    button.addEventListener("click",()=>{
     this.removeTab(Number(button.getAttribute("index")))
    })
    await this.timeout(50)
    document.querySelector(`#mat-tab-label-0-${this.tabs.length-1}`)?.appendChild(button)
    this.selected.setValue(this.tabs.length - 1);
  }
}
