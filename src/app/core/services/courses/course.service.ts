import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course, CourseData } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private courseCollection: AngularFirestoreCollection<CourseData>;

  courses: Observable<Course[]>;

  constructor(
    public firestore: AngularFirestore
  ) {
    this.courseCollection = this.firestore.collection<CourseData>('CourseData');
    this.courses = this.courseCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        return data;
      }))
    );
  }

  addCourse(courseData: CourseData) {
    this.courseCollection.doc(courseData.id).set(courseData);
  }

  getCourses(): Observable<Course[]> {
    return this.courses;
  }

  getCourse(id: string) {
    this.courses.subscribe(courses => {
      return courses.find(c => c.id === id);
    });
  }

}
