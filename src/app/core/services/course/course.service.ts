import { Injectable, Optional, SkipSelf } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Course } from 'src/app/shared/models/course.model';
import { GetMockCourses } from './mock-courses';

const FbKeys = {
  database: 'CourseData'
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
	private courseCollection: AngularFirestoreCollection<Course>;

	courses: Observable<Course[]>;
  
	constructor(
		public firestore: AngularFirestore,
		@Optional() @SkipSelf() sharedInstance: CourseService
	) {
		if (sharedInstance) {
			throw new Error('CourseService is alreaded loaded');
		}
		this.courseCollection = this.firestore.collection<Course>(FbKeys.database);
	
		this.courses = GetMockCourses();
		// this.courses = this.courseCollection.snapshotChanges().pipe(
		// 	map(actions => actions.map(a => {
		// 		const data = a.payload.doc.data() as Course;
		// 		return data;
		// 	}))
		// );
	}
  
	queryCourses(subject: string, numbers: string) {
		this.courses = this.firestore.collection<Course>(FbKeys.database, ref => {
			return ref.orderBy('id').where('subject', '==', subject).where('number', '==', numbers).limit(30)
			// return ref.orderBy('id').where('subject', '==', subject).limit(30)
		}).snapshotChanges().pipe(
			map(actions => actions.map(a => {
			return a.payload.doc.data() as Course;
			}))
		);
	}
  
	addCourse(course: Course) {
		this.courseCollection.doc(course.id).set(course);
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
