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
import { TabsService } from '../services/tabs.service';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatIconModule,MatListModule,CommonModule,MatTabsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  vcr = viewChildren('tabcontainer',{read:ViewContainerRef})
  
  constructor(public tabs:TabsService){}

  ngAfterViewInit(){
    this.tabs.setVCR(this.vcr)
  }

  async showList(){
    const tab = this.tabs.tabs.map(t=>{ return t.label}).indexOf("Test list")
    if(tab == -1){
      await this.tabs.addTab<TestListComponent>("Test list",TestListComponent)
      return
    }
    this.tabs.selected.setValue(tab)
    this.tabs.animation(true)
  }
  async newTest(){
    await this.tabs.addTab<NewTestComponent>("New test",NewTestComponent)
    
  }
  async newRequirement(){
    await this.tabs.addTab<NewRequirementComponent>("New requirement",NewRequirementComponent)
  }
}
