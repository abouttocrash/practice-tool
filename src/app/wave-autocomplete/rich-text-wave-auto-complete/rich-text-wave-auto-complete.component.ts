import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu'; 
@Component({
  selector: 'rich-text-wave-auto-complete',
  standalone: true,
  imports:[OverlayModule,MatIconModule,MatMenuModule],
  templateUrl: './rich-text-wave-auto-complete.component.html',
  styleUrls: ['./rich-text-wave-auto-complete.component.scss']
})
export class RichTextWaveAutoCompleteComponent{
  @Input("autoData") auto!:Array<string>
  @Input("index") index:number  = 0
  @Output() removeItem = new EventEmitter<RichTextWaveAutoCompleteComponent>();
  @Output() addItem = new EventEmitter<RichTextWaveAutoCompleteComponent>()
  @ViewChild(MatAutocompleteTrigger) _auto!: MatAutocompleteTrigger;
  @ViewChild('waveRich',{static:false})  i!:ElementRef<HTMLDivElement>
  private div!:HTMLDivElement
  private things:number[] = []
  private foundMode = false;
  private previous = ""
  
  waitForKey = false;
  model = ""
 
constructor(){

}
ngAfterViewInit(){
  this.div = this.i.nativeElement
 
}
removeClicked(){
  this.removeItem.emit(this);
}


getText(){
  return this.div.textContent as string
}

private buttonClicked(target:EventTarget){
  this.div.focus()
  let t = target as HTMLElement
  t = t.children.length == 0 ? t = t.parentElement! : t
  if(t.classList.contains("test-style-cta-selected"))
    t.classList.remove("test-style-cta-selected")
  else
    t.classList.add("test-style-cta-selected")
    document.execCommand(t.id.split("-cta")[0])
}

private italic(target: EventTarget){
  this.buttonClicked(target)
  document.execCommand("italic")
}
private reset(){
  document.execCommand("removeFormat", false, "foreColor");
}
private color() {
  document.execCommand('styleWithCSS', false);
    document.execCommand('foreColor', false, "rgba(255,0,0,0.5)");
    document.defaultView!.focus();
  }
  private searchString(): string {
    const inputText = this.div.textContent?.toLowerCase() || "";
    if (!inputText) return "";
  
    const match = this.auto.find((word) => word.toLowerCase().startsWith(inputText));
    if (!match) return "";
  
    return match.substring(inputText.length);
  }
private selectTextRange(start:number,stop:number){
  const range = document.createRange();
  const node = this.div.firstChild;

  if (!node) throw new Error("No text content available");

  range.setStart(node, start);
  range.setEnd(node, stop + 1);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  return selection!;
}
protected keyup(event: KeyboardEvent): void {
  if (this.waitForKey) return;

  if (event.key !== "Backspace") {
    const foundSuffix = this.searchString();
    if (foundSuffix) {
      this.foundMode = true;

      this.previous = this.div.textContent || "";
      this.div.textContent += foundSuffix;
      const currentLength = this.previous.length;

      setTimeout(() => {
        this.selectTextRange(currentLength, this.div.textContent!.length - 1);
      });
    }
  }
}
protected keydown($event: KeyboardEvent) {
  this.waitForKey = false;
  if(this.things.length == 0){
    this.things.push(0)
    document.execCommand('formatBlock', false, 'p')
  }
  if(this.foundMode){
    if($event.key == "Backspace"){
      this.div.textContent = this.previous
      this.selectTextRange(0,this.previous.length-1).collapseToEnd()
      this.foundMode = false;
      this.waitForKey = true;
    }
    else{
      this.previous += $event.key
    }
  }
 
  if($event.key == "Enter" || $event.key == "ArrowRight"){
    if(this.foundMode){
      $event.preventDefault()
      this.previous = this.div.textContent!
      this.foundMode = false;
      this.selectTextRange(0,this.div.textContent!.length-1).collapseToEnd()
    }
  }
}

}
