import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ICourse } from '../../../../interfaces/course-interface';
import { IDays } from '../../../../interfaces/days-interface';
import { CatalogService } from '../../../catalog.service';
import { ToastrService } from 'ngx-toastr';

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

  @Output()
  public onModifiedCourse : EventEmitter<boolean> = new EventEmitter();

  @ViewChild('closeModalBtn') element!: ElementRef;

  ngOnChanges(changes:SimpleChanges){
    if(changes["selectedCourse"]){
      this.form.patchValue({
        courseName : this.selectedCourse?.name,
        roomNumber : this.selectedCourse?.roomNumber,
        professorName : this.selectedCourse?.professor?.name,
        professorEmail : this.selectedCourse?.professor?.email,
        daysCheckboxGroup :
            {
            sundayChk: this.selectedCourse?.days.sunday,
            thursdayChk: this.selectedCourse?.days.thursday,
            mondayChk: this.selectedCourse?.days.monday,
            fridayChk: this.selectedCourse?.days.friday,
            tuesdayChk: this.selectedCourse?.days.tuesday,
            saturdayChk: this.selectedCourse?.days.saturday,
            wednesdayChk: this.selectedCourse?.days.wednesday,
           }
      });
    }
  }

  constructor(private fb: FormBuilder, private service: CatalogService, private toastr: ToastrService, private catalogService: CatalogService) { }

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

    if (!this.selectedCourse.id || this.selectedCourse?.id == -1) {
      this.service.insertCourse(model).subscribe({
        next: res => {
         this.onModifiedCourse.emit(true);
          this.toastr.success('The course was created succesfully.');
          this.element.nativeElement.click();
        },
        error: error =>  this.toastr.error('Error while trying to complete the operation.'),
      });
    } else {
      model.id = this.selectedCourse.id!,
      model.professor.id = this.selectedCourse.professor.id!
      this.service.updateCourse(model).subscribe({
        next: res => {
          this.onModifiedCourse.emit(true);
          this.element.nativeElement.click();
          this.toastr.success("The course was edited succesfully.")
        },
        error: error => this.toastr.error('Error while trying to complete the operation.'),
        complete: () => {
          this.selectedCourse = {
            id : -1,
          } as ICourse;
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
