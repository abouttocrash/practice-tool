import { ChangeDetectionStrategy, Component, ComponentRef, computed, inject,  model,  signal,  Signal,  ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormExports} from '../services/FormExports'
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { RichTextWaveAutoCompleteComponent } from '../wave-autocomplete/rich-text-wave-auto-complete/rich-text-wave-auto-complete.component';
import { BehaviorSubject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { TabsService } from '../services/tabs.service';
import { Tag, Test } from '../../../types/Types';
import { HttpService } from '../services/http.service';
import {MatSelectModule} from '@angular/material/select'; 
import { ChipsComponent } from '../common/chips/chips.component';
import { WaveInputComponent } from '../common/wave-input/wave-input.component';
@Component({
  selector: 'app-new-test',
  standalone: true,
  imports: [FormExports,WaveInputComponent, MatMenuModule,MatAutocompleteModule,MatSelectModule,ChipsComponent],
  templateUrl: './new-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './new-test.component.scss'
})
export class NewTestComponent {
  @ViewChild('container', { read: ViewContainerRef })
  private vcr!: ViewContainerRef;
  @ViewChild('chips') chips!:ChipsComponent
  tags:Tag[] = []
  readonly currentReq = model('');
  allReqs: string[] = [];
  priorities = [
    {value:"0",viewValue:"Highest"}
  ]
  lastBlurred!:RichTextWaveAutoCompleteComponent
  id = ""
  stepsArr:ComponentRef<RichTextWaveAutoCompleteComponent>[] = []
  submitted = false;
  foundSteps = ["test 1","test 2"]
  loading$ = new BehaviorSubject<boolean>(false);
  filteredReqs: Signal<string[]> = signal<string[]>([])
  testForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    req: new FormControl('', [Validators.required]),
    priority: new FormControl('',[Validators.required])
  });
  constructor(private tabs:TabsService,private http:HttpService){}

  async ngAfterViewInit(){
    this.addStep(0)
    const r = await this.http.getAllRequirements()
    this.allReqs = r.data.map((re:any)=>{return re.name})
    this.filteredReqs = computed(() => {
      const currentReq = this.currentReq().toLowerCase();
      return currentReq
        ? this.allReqs.filter(r => r.toLowerCase().includes(currentReq))
        : this.allReqs.slice();
    });
    this.tags = (await this.http.getTags()).data

  }
  async onSubmit() {
    this.testForm.markAllAsTouched()
    if (this.testForm.invalid) return;
    const test:Test = {
      id:"",
      priority:this.testForm.get<string>("priority")!.value,
      req_id:this.testForm.get<string>("req")!.value,
      steps:this.getSteps(),
      name:this.testForm.get<string>("name")!.value,
      tags:this.chips.getSelectedTagsAsIds(),
      created: ""
    }
    this.loading$.next(true)
    //await this.http.createTest(test)
    this.tabs.updateTabName(this.tabs.getTabIndex(this.id),test.name)
    this.loading$.next(false)
    this.submitted = true
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    
    this.currentReq.set('');
  }

  getSteps(){
    return this.stepsArr.map(s=>{
      return {
        uuid:"",
        testId:"",
        text: s.instance.getText(),
        tags:[]
      }
    })
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
    componentRef.instance.blurred.subscribe(()=>{
      this.lastBlurred = componentRef.instance
    })
  }
  

  


  isFieldInvalid(fieldName: string): boolean {
    const field = this.testForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  buttonClicked(target:EventTarget){
    let t = document.activeElement!
    t = t.children.length == 0 ? t = t.parentElement! : t
    if(t.classList.contains("test-style-cta-selected"))
      t.classList.remove("test-style-cta-selected")
    else
      t.classList.add("test-style-cta-selected")
      document.execCommand(t.id.split("-cta")[0])
  }

  color() {
    document.execCommand('styleWithCSS', false);
      document.execCommand('foreColor', false, "rgba(255,0,0,0.5)");
      document.defaultView!.focus();
  }

  reset(){
    document.execCommand("removeFormat", false, "foreColor");
  }
}
