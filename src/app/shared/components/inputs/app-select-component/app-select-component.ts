import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material-module';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './app-select-component.html',
  styleUrl: './app-select-component.scss',
})
export class AppSelectComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label: string = 'Select option';
  @Input({ required: true }) options: { value: any; label: string }[] = [];
  @Input({ required: true }) placeholder: string = 'Please choose';
}
