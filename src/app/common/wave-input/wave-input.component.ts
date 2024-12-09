import { Component, Input } from '@angular/core';
import { FormExports } from '../../services/FormExports';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'wave-input',
  standalone: true,
  imports: [FormExports],
  templateUrl: './wave-input.component.html',
  styleUrl: './wave-input.component.scss'
})
export class WaveInputComponent {
  @Input() errorMessage = ""
  @Input() label = "Placeholder"
  @Input() placeholder = "Placeholder"
  @Input() control: AbstractControl = new FormControl<string>('');
  @Input() id = ""


  isFieldInvalid(){
    return !!(this.control.invalid && this.control.touched);
  }
}
