import { CommonModule } from '@angular/common';
import { Component, ViewChild} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { HttpService } from '../services/http.service';
import { Test } from '../../../types/Types';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav'; 
@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, MatList,MatListItem,MatIcon,MatSidenavModule],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss'
})
export class TestListComponent {
  @ViewChild("drawer") drawer!:MatDrawer
  tests:Test[] = []
  test:Test ={} as Test
  constructor(private http:HttpService){}
  async ngAfterViewInit(){
    const response = await this.http.getAllTests()
    this.tests = response.data
  }

  async getTest(test:Test){
    this.test = test
    await this.http.getTest(test)
    this.drawer.toggle()
  }
}
