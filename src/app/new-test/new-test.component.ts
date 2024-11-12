import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-test',
  standalone: true,
  imports: [FormsModule,MatInput,MatLabel, ReactiveFormsModule,MatFormField,RouterLink],
  templateUrl: './new-test.component.html',
  styleUrl: './new-test.component.scss'
})
export class NewTestComponent {
  testName:string = ""
  namePlaceholder = "Enter a name for the test case"
  reqPlaceholder = "Match the test case to its parent requirement" 
}
