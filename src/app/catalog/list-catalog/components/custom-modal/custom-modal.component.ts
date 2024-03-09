import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent {
  @Input()
  public form!: FormGroup;

  @Output()
  public onSaveCourse : EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  onCancel(): void {
    this.form.reset();

  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors
      && this.form.controls[field].touched;
  }

  onSave(): void {
    this.onSaveCourse.emit(true);

  }
}
