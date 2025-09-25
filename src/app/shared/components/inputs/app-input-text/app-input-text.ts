import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: false,
  templateUrl: './app-input-text.html',
  styleUrl: './app-input-text.scss',
})
export class AppInputText {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
}
