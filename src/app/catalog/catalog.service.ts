import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments';
import { ICourse } from '../interfaces/course-interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http : HttpClient) {
  // this.courses$;
  }

  get courses$() {
    return this.http.get<ICourse[]>(`${ this.baseUrl }/CourseCatalog`);
  }

  insertCourse(model : ICourse):Observable<ICourse> {
    return this.http.post<ICourse>(`${ this.baseUrl }/CourseCatalog`,model);
  }

  updateCourse(model : ICourse):Observable<ICourse> {
    return this.http.put<ICourse>(`${ this.baseUrl }/CourseCatalog`,model);
  }

  deleteCourse(id : number):Observable<ICourse> {
    return this.http.delete<ICourse>(`${ this.baseUrl }/CourseCatalog/${id}`);
  }


}
