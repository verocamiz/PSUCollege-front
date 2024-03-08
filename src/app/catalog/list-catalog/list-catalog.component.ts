 import { Component, OnInit, ViewChild } from '@angular/core';
import { ICourse } from '../../interfaces/course-interface';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrl: './list-catalog.component.css'
})
export class ListCatalogComponent implements OnInit {

  @ViewChild('courseModal') courseModal: any;

  courses : ICourse[] =[];
  constructor(private catalogService :CatalogService){}
  selectedCourseToEdit: ICourse = {} as ICourse;

  ngOnInit(): void {
    this.catalogService.getCourses().subscribe( list => this.courses = list);
  }

  openEditModal(course: ICourse){
   // const element = document.getElementById("courseModalBtn") as HTMLButtonElement;
    //element.click();
    this.courseModal.modal('show');
    this.selectedCourseToEdit = course;
  }

}
