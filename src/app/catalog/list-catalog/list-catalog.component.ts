 import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ICourse } from '../../interfaces/course-interface';
import { CatalogService } from '../catalog.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrl: './list-catalog.component.css'
})
export class ListCatalogComponent implements OnInit {

  @ViewChild('courseModalBtn') element!: ElementRef;

  courses! : Observable<ICourse[]>;

  constructor(private catalogService :CatalogService){}
  selectedCourseToEdit: ICourse = {} as ICourse;

  ngOnInit(): void {
   this.getCourses();
  }

  getCourses(){
    this.courses = this.catalogService.courses$;
  }

  openEditModal(course: ICourse){
    this.element.nativeElement.click();
    this.selectedCourseToEdit = course;
  }

}
