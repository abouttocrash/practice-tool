import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../common/loader/loader.component';
export const FormExports = [
    MatFormFieldModule,
    MatInput,
    MatIconModule,
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent
] as const