import { Component} from '@angular/core';
import { FormExports } from '../services/FormExports';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject} from 'rxjs';
import { ChipsComponent } from '../common/chips/chips.component';
import { Requirement, Tag } from '../../../types/Types';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-new-requirement',
  standalone: true,
  imports: [FormExports,ChipsComponent],
  templateUrl: './new-requirement.component.html',
  styleUrl: './new-requirement.component.scss'
})
export class NewRequirementComponent {
  tags:string[] =[]
  loading$ = new BehaviorSubject<boolean>(false);
  testForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required])
  });
  constructor(private http:HttpService){}
  
  async ngAfterViewInit(){
    this.tags = (await this.http.getTags()).data.map((t:Tag)=>{return t.tag})!
  }

 
  async onSubmit() {
    
    //this.testForm.markAllAsTouched()
    if (this.testForm.invalid) return;
    this.loading$.next(true)
    const requirement:Requirement = {
      name:this.testForm.get("name")?.value!,
      id:this.testForm.get("id")?.value!,
      description: this.testForm.get("desc")?.value!,
      tags:[] as Tag[],
    }
    await this.http.createRequirement(requirement)
    this.loading$.next(false)

  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.testForm.get(fieldName);
   
    return !!(field?.invalid && field?.touched);
  }
}
