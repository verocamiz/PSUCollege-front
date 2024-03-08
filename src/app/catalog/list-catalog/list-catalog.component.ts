 import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICourse } from '../../interfaces/course-interface';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrl: './list-catalog.component.css'
})
export class ListCatalogComponent implements OnInit {

  @ViewChild('courseModalBtn') element!: ElementRef;

  courses : ICourse[] =[];
  constructor(private catalogService :CatalogService){}
  selectedCourseToEdit: ICourse = {} as ICourse;

  ngOnInit(): void {
    this.catalogService.getCourses().subscribe( list => this.courses = list);
  }

  openEditModal(course: ICourse){

    this.element.nativeElement.click();

    this.selectedCourseToEdit = course;
  }

}
