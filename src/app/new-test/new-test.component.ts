import { ChangeDetectionStrategy, Component, ComponentRef, inject,  ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormExports} from '../services/FormExports'
import { RichTextWaveAutoCompleteComponent } from '../wave-autocomplete/rich-text-wave-auto-complete/rich-text-wave-auto-complete.component';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { Step, Test } from '../../../types/Types';
@Component({
  selector: 'app-new-test',
  standalone: true,
  imports: [FormExports, MatMenuModule,],
  templateUrl: './new-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './new-test.component.scss'
})
export class NewTestComponent {
  @ViewChild('container', { read: ViewContainerRef })
  private vcr!: ViewContainerRef;
  httpClient = inject(HttpClient)
  stepsArr:ComponentRef<RichTextWaveAutoCompleteComponent>[] = []
  reqName:string = ""
  submitted = false;
  foundSteps = ["test 1","test 2"]
  loading$ = new BehaviorSubject<boolean>(false);
  namePlaceholder = "Enter a name for the test case"
  reqPlaceholder = "Match the test case to its parent requirement" 
  testForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    req: new FormControl('', [Validators.required])
  });
  constructor(){}

  ngAfterViewInit(){
    this.addStep(0)
  }
  async onSubmit() {
    
    if (this.testForm.invalid) return;
    const test:Test = {
      id:"",
      req_id:this.testForm.get<string>("req")!.value,
      steps:this.getSteps(),
      name:this.testForm.get<string>("name")!.value,
      tags:[]
    }
    this.loading$.next(true)
    await firstValueFrom( this.httpClient.post("http://localhost:3000/test",test))
    
    await this.timeout(1000)
    this.loading$.next(false)
    this.submitted = true

  }

  getSteps(){
    return this.stepsArr.map(s=>{
      return {
        text: s.instance.getText(),
        tags:[]
      }
    })
  }
  

  timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    
  }
  addStep(i:number){
    const componentRef = this.vcr.createComponent(RichTextWaveAutoCompleteComponent);
    componentRef.instance.index = i
    componentRef.instance.auto = this.foundSteps
    this.vcr.insert(componentRef.hostView);
    this.stepsArr.push(componentRef)
    componentRef.instance.removeItem.subscribe(()=>{
      const index = this.vcr.indexOf(componentRef.hostView)
      if (index != -1) this.vcr.remove(index)
    })
  }
  

  


  isFieldInvalid(fieldName: string): boolean {
    const field = this.testForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
