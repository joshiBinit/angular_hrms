import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  standalone: false,
  templateUrl: './app-input-file.html',
  styleUrl: './app-input-file.scss',
})
export class AppInputFile {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() accept: string = '*';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.control.setValue(file);
      this.control.markAsDirty();
      this.control.markAsTouched();
    }
  }

  get fileName(): string | null {
    return this.control.value ? this.control.value.name : null;
  }
}
