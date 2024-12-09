import { ComponentRef, Injectable, Signal, Type, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
export type Tab<T> = {
  label:string,
  instance:ComponentRef<T> | undefined
}
@Injectable({
  providedIn: 'root'
})
export class TabsService {
  menuDisabled = false;
  tabs:Tab<any>[] = []
  selected = new FormControl(0);
  private vcr!: Signal<readonly ViewContainerRef[]>
  constructor() { }

  setVCR(vcr: Signal<readonly ViewContainerRef[]>){
    this.vcr = vcr
  }
  async addTab<T>(label:string, type:Type<T>){
    this.menuDisabled = true;
    this.tabs.push({label:label,instance:undefined})
    await this.createXButton()
    const component = this.vcr()[this.tabs.length-1]?.createComponent<any>(type)
    component.instance.id = Math.floor(Math.random() * 100000)+"";
    this.tabs[this.tabs.length-1].instance = component
  }

  private timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createXButton(index = this.tabs.length-1){
    const sel = `#mat-tab-label-0-${index} span.mdc-tab__content`
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
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }

  getTabIndex(id:string){
    return this.tabs.map(t=>{return t.instance}).map(i=>{return i?.instance.id}).indexOf(id)
  }

  updateTabName(index:number,label:string){
    this.tabs[index].label = label
    
  }

  animation($event: any) {
    this.menuDisabled = false;
  }
}
