import { Component, inject } from '@angular/core';
import { FormExports } from '../services/FormExports';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-requirement',
  standalone: true,
  imports: [FormExports],
  templateUrl: './new-requirement.component.html',
  styleUrl: './new-requirement.component.scss'
})
export class NewRequirementComponent {

  httpClient = inject(HttpClient)
  loading$ = new BehaviorSubject<boolean>(false);
  testForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required])
  });
  async onSubmit() {
    
    //this.testForm.markAllAsTouched()
    if (this.testForm.invalid) return;
    this.loading$.next(true)
    const requirement = {
      name:this.testForm.get("name")?.value,
      id:this.testForm.get("id")?.value,
      description: this.testForm.get("desc")?.value
    }
    await firstValueFrom( this.httpClient.post("http://localhost:3000/requirement",requirement))
    this.loading$.next(false)

  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.testForm.get(fieldName);
   
    return !!(field?.invalid && field?.touched);
  }
}
