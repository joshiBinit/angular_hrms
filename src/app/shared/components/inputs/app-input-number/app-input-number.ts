import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: false,
  templateUrl: './app-input-number.html',
  styleUrl: './app-input-number.scss',
})
export class AppInputNumber {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() min?: number;
}
