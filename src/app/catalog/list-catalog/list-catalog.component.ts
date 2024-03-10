 import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ICourse } from '../../interfaces/course-interface';
import { CatalogService } from '../catalog.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrl: './list-catalog.component.css'
})
export class ListCatalogComponent implements OnInit {

  @ViewChild('courseModalBtn') element!: ElementRef;

  courses! : Observable<ICourse[]>;

  selectedCourse!: ICourse;

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

  constructor(private catalogService :CatalogService,private fb: FormBuilder, private toastr: ToastrService){}


  ngOnInit(): void {
   this.getCourses();
  }

  getCourses(){
    this.courses = this.catalogService.courses$;
  }

  openEditModal(course: ICourse){
    this.element.nativeElement.click();
    this.selectedCourse = course;

      this.form.patchValue({
        courseName : course?.name,
        roomNumber : course?.roomNumber,
        professorName : course?.professor?.name,
        professorEmail : course?.professor?.email,
        daysCheckboxGroup :
            {
            sundayChk: course?.days.sunday,
            thursdayChk: course?.days.thursday,
            mondayChk: course?.days.monday,
            fridayChk: course?.days.friday,
            tuesdayChk: course?.days.tuesday,
            saturdayChk: course?.days.saturday,
            wednesdayChk: course?.days.wednesday,
           }
      });

  }

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

    if (!this.selectedCourse?.id || this.selectedCourse?.id == -1) {
      this.catalogService.insertCourse(model).subscribe({
        next: res => {
          this.getCourses();
          this.toastr.success('The course was created succesfully.');
         this.element.nativeElement.click();
        },
        error: error =>  this.toastr.error('Error while trying to complete the operation.'),
      });
    } else {
      model.id = this.selectedCourse.id!,
      model.professor.id = this.selectedCourse.professor.id!
      this.catalogService.updateCourse(model).subscribe({
        next: res => {
         this.getCourses();
         this.element.nativeElement.click();
          this.toastr.success("The course was edited succesfully.")
        },
        error: error => this.toastr.error('Error while trying to complete the operation.'),
        complete: () => {
          this.selectedCourse = {
            id : -1,
          } as ICourse;

          this.form.reset();
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
