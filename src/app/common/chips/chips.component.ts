import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, computed, inject, Input, model, Signal, signal} from '@angular/core';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { FormExports } from '../../services/FormExports';
import {MatButtonModule} from '@angular/material/button'; 
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent,MatDialogActions, MatDialogModule, MatDialogTitle, MatDialogRef} from '@angular/material/dialog'; 
import {MatMenuModule} from '@angular/material/menu'; 
import { HttpService } from '../../services/http.service';
import { Tag } from '../../../../types/Types';
@Component({
  selector: 'chips',
  standalone: true,
  imports: [FormExports,MatAutocompleteModule,MatChipsModule,MatButtonModule,MatDialogModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  selectedColor = "#ff5b59"
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  currentTag = model('');
  readonly tags=signal<Tag[]>([])
  @Input() allTags: Tag[] = [];
  filteredTags: Signal<Tag[]> = signal<Tag[]>([])
  dialog = inject(MatDialog);
  ngOnChanges(){
    this.filteredTags = computed(() => {
      const currentTag = this.currentTag().toLowerCase();
      return currentTag
        ? this.allTags.filter(tag => tag.tag.toLowerCase().includes(currentTag))
        : this.allTags.slice();
    });
  }
  openDialog(event:Event) {
    event.stopPropagation()
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

  readonly announcer = inject(LiveAnnouncer);
  getSelectedTagsAsIds(){
    return this.tags().map(t=>{return t.uuid!})!
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const exists = this.allTags.filter(tag => tag.tag.toLowerCase().includes(value))
    if (exists.length == 1) {
      this.tags.update(tags => [...tags, exists[0]]);
    }
    this.currentTag.set('');
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      return [...tags];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    
    const tag = this.allTags.find(t=>{return t.tag == event.option.viewValue})!
    this.tags.update(tags => [...tags, tag]);
    this.currentTag.set('');
    event.option.deselect();
  }
}
@Component({
  selector: 'dialog-data-example-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Create a new tag</h2>
  <mat-dialog-content>
    <mat-form-field appearance="outline" style="display:inline-block">
      <mat-label>Enter the new tag</mat-label>
      <input [(ngModel)]="tagName" id="tagName-name" matInput>
      <mat-error *ngIf="error">Requirement should not be empty</mat-error>
    </mat-form-field> 
    <div style="display:inline-block" [matMenuTriggerFor]="menu">
      <span class='block-color' [ngStyle]="{'background-color':selectedColor}"></span>
    </div>
    <mat-menu #menu="matMenu">
    @for (color of colors(); track $index){
      <button (click)="selectedColor = color">
        <span class='block-color' [ngStyle]="{'background-color':color}"> </span>
      </button>
    }
  
</mat-menu>
  </mat-dialog-content>
  <mat-dialog-actions>
  <button mat-button (click)="createTag()">Create</button>
</mat-dialog-actions>
  `,
  imports: [MatDialogTitle,MatDialogActions, MatDialogContent,FormExports,MatButtonModule,MatMenuModule],
})
export class DialogDataExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogDataExampleDialog>);
  error = false
  tagName = ""
  selectedColor = "#ff5b59"
  colors = signal<string[]>(["#ff5b59","#f65385","#17bde9"])
  data = inject(MAT_DIALOG_DATA);
  constructor(private http:HttpService){}

  async createTag(){
    const request:Tag = {
      tag:this.tagName,
      color:this.selectedColor,
      uuid:""
    }
    const tag = await this.http.createTag(request)
    this.dialogRef.close(tag)
  }


}
