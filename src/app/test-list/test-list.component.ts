import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { HttpService } from '../services/http.service';
import { Test } from '../../../types/Types';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, MatList,MatListItem,MatIcon],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss'
})
export class TestListComponent {
  
  tests:Test[] = []
  constructor(private http:HttpService){}
  async ngAfterViewInit(){
    const response = await this.http.getAllTests()
    this.tests = response.data
  }
}
