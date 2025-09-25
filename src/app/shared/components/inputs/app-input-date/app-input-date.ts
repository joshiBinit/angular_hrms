import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  standalone: false,
  templateUrl: './app-input-date.html',
  styleUrl: './app-input-date.scss',
})
export class AppInputDate {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder: string = '';
}
