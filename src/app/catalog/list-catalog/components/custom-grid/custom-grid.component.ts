import { Component, Input, Output, input, EventEmitter } from '@angular/core';
import { ICourse } from '../../../../interfaces/course-interface';
import { IDays } from '../../../../interfaces/days-interface';
import { CatalogService } from '../../../catalog.service';

@Component({
  selector: 'custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrl: './custom-grid.component.css'
})
export class CustomGridComponent {

  @Input()
  list : ICourse[] =[];

  @Output() selectCourseToEdit = new EventEmitter<ICourse>();

  constructor(private service: CatalogService){}

  getDaysText(days:IDays): string{
    let text = '';

    for (var key in days) {
      if (days.hasOwnProperty(key)) {
        text += key.slice(0,3) + ' ';
      }
    }

    return text;
  }

  onDelete(id:number){
    this.service.deleteCourse(id).subscribe({
      next: res => {
        //toast
      },
      error: error => console.error(error),
      complete: () => {
        //cerrar modal y refetch
      }
    });
  }

  editCourse(course: ICourse){
    this.selectCourseToEdit.emit(course);
  }
}
