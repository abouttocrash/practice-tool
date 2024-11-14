import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { RichTextWaveAutoCompleteComponent } from '../wave-autocomplete/rich-text-wave-auto-complete/rich-text-wave-auto-complete.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge, tap } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-new-test',
  standalone: true,
  imports: [MatFormFieldModule,CommonModule, MatProgressSpinnerModule,FormsModule,MatInput,MatLabel, ReactiveFormsModule,MatFormField,RouterLink,RichTextWaveAutoCompleteComponent],
  templateUrl: './new-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './new-test.component.scss'
})
export class NewTestComponent {
  testName:string = ""
  reqName:string = ""
  submitted = false;
  loading$ = new BehaviorSubject<boolean>(false);
  namePlaceholder = "Enter a name for the test case"
  reqPlaceholder = "Match the test case to its parent requirement" 
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    req: new FormControl('', [Validators.required])
  });

  async onSubmit() {
    if (this.signUpForm.invalid) return;
    this.loading$.next(true)
    await this.timeout(1000)
    this.loading$.next(false)
    this.submitted = true

  }
  constructor(){
   
  }

  timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    
  }

  createTest(){
   
    
  }
}
