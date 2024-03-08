import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ICourse } from '../../../../interfaces/course-interface';
import { IDays } from '../../../../interfaces/days-interface';
import { CatalogService } from '../../../catalog.service';

@Component({
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent implements OnChanges{
  public form: FormGroup = this.fb.group({
    courseName: ['', [Validators.required]],
    roomNumber: [],
    professorName: [''],
    professorEmail: ['', Validators.email],
    daysCheckboxGroup: this.fb.group({
      sundayChk: [false],
      thursdayChk: [false],
      mondayChk: [false],
      fridayChk: [false],
      tuesdayChk: [false],
      saturdayChk: [false],
      wednesdayChk: [false],
    },
      {
        validators: this.atLeastOneCheckboxCheckedValidator()
      }),
  });
  @Input() selectedCourse!: ICourse;

  ngOnChanges(changes:SimpleChanges){
    // console.log(changes["selectedCourse"]);

    this.form.controls['courseName'].setValue(this.selectedCourse.name);
    this.form.controls['roomNumber'].setValue(this.selectedCourse.roomNumber);
    this.form.controls['professorName'].setValue(this.selectedCourse.professor.name);
    this.form.controls['professorEmail'].setValue(this.selectedCourse.professor.email);
    // this.form.get('daysCheckboxGroup')["sundayChk"]
  }

  constructor(private fb: FormBuilder, private service: CatalogService) { }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form.value);
      return;
    }

    let model: ICourse = {
      name: this.form.get('courseName')?.value,
      roomNumber: this.form.get('roomNumber')?.value,
      professor: {
        name: this.form.get('professorName')?.value,
        email: this.form.get('professorEmail')?.value,
      },
      days: this.form.get('daysCheckboxGroup')?.value,
      listDays: this.getListDays(this.form.get('daysCheckboxGroup')?.value)
    } as ICourse;

    if (!this.selectedCourse.id) {
      this.service.insertCourse(model).subscribe({
        next: res => {
          //toast
        },
        error: error => console.error(error),
        complete: () => {
          //cerrar modal y refetch
        }
      });
    } else {
      model.id = this.selectedCourse.id!,
      model.professor.id = this.selectedCourse.professor.id!
      this.service.updateCourse(model).subscribe({
        next: res => {
          //toast
        },
        error: error => console.error(error),
        complete: () => {
          //cerrar modal y refetch
        }
      });
    }
  }

  getListDays(days: any) {
    let listDays = '';
    Object.keys(days).forEach(key => {
      const control :boolean = days[key];

      if(control){
        listDays += this.getDayID(key) +',';
      }
    });
    listDays = listDays.slice(0,-1);
    return listDays;
  }


  getDayID(key: string) {
    switch (key) {
      case 'mondayChk':
        return '1';
      case 'tuesdayChk':
        return '2';
      case 'wednesdayChk':
        return '3';
      case 'thursdayChk':
        return '4';
      case 'fridayChk':
        return '5';
      case 'saturdayChk':
        return '6';
      case 'sundayChk':
        return '7';
      default:
        return '';
    }
  }

  onCancel(): void {
    this.form.reset();
  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors
      && this.form.controls[field].touched;
  }

  atLeastOneCheckboxCheckedValidator(minRequired = 1) {
    return function validate(formGroup: FormGroup) {
      let checked = 0;

      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];

        if (control.value === true) {
          checked++;
        }
      });

      if (checked < minRequired) {
        return {
          requireCheckboxToBeChecked: true,
        };
      }

      return null;
    };
  }
}
