import { Component, Input, Output, input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ICourse } from '../../../../interfaces/course-interface';
import { IDays } from '../../../../interfaces/days-interface';
import { CatalogService } from '../../../catalog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrl: './custom-grid.component.css'
})
export class CustomGridComponent {

  @Input()
  list : ICourse[] | null =[];

  @Output() selectCourseToEdit = new EventEmitter<ICourse>();

  @ViewChild('deleteModalBtn') element!: ElementRef;

  @Output()
  public onDeletedCourse : EventEmitter<boolean> = new EventEmitter();

  courseID : number = -1;

  constructor(private catalogService: CatalogService,private toastr: ToastrService){}

  getDaysText(days:IDays): string{
    let text = '';

    for (var key in days) {
      if (days.hasOwnProperty(key) && days[key as keyof IDays]) {
        text += key.slice(0,3) + ' ';
      }
    }

    return text;
  }

  onDelete(){
    this.catalogService.deleteCourse(this.courseID).subscribe({
      next: res => {
        this.onDeletedCourse.emit(true);
        this.toastr.success('The course was deleted succesfully.');
        this.element.nativeElement.click();
      },
      error: error =>  this.toastr.error('Error while trying to complete the operation.')
    });
  }

  editCourse(course: ICourse){
    this.selectCourseToEdit.emit(course);
    this.setCourseID(course);
  }

  setCourseID(item:ICourse){
    this.courseID = item.id;
  }
}
