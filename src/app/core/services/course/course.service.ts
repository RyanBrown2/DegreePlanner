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
	
		// this.courses = GetMockCourses();
		this.courses = new Observable<Course[]>;
		// this.courses = this.courseCollection.snapshotChanges().pipe(
		// 	map(actions => actions.map(a => {
		// 		const data = a.payload.doc.data() as Course;
		// 		return data;
		// 	}))
		// );
	}

	// This function is for querying courses from the collection given criteria
	// This function does overwrite this.courses
	queryCourses(subject?: string, number?: string) {
		if (subject != null && number != null) {
			this.courses = this.firestore.collection<Course>(FbKeys.database, ref => {
				return ref.orderBy('id').where('subject', '==', subject).where('number', '==', number).limit(30);
			}).snapshotChanges().pipe(
				map(actions => actions.map(a => {
				return a.payload.doc.data() as Course;
				}))
			);
		} else if (subject != null && number == null) {
			this.courses = this.firestore.collection<Course>(FbKeys.database, ref => {
				return ref.orderBy('id').where('subject', '==', subject).limit(30);
			}).snapshotChanges().pipe(
				map(actions => actions.map(a => {
				return a.payload.doc.data() as Course;
				}))
			);
		} else if (subject == null && number != null) {
			this.courses = this.firestore.collection<Course>(FbKeys.database, ref => {
				return ref.orderBy('id').where('number', '==', number).limit(30);
			}).snapshotChanges().pipe(
				map(actions => actions.map(a => {
				return a.payload.doc.data() as Course;
				}))
			);
		} else {
			this.courses = this.courseCollection.snapshotChanges().pipe(
				map(actions => actions.map(a => {
					const data = a.payload.doc.data() as Course;
					return data;
				}))
			);
		}
	}

	// Add a course document to the collection
	addCourse(course: Course) {
		this.courseCollection.doc(course.id).set(course);
	}

	// Get this.courses
	getCourses(): Observable<Course[]> {
		return this.courses;
	}
  
	// get a course from the currently loaded courses
	getCourse(id: string): Course | null {
		this.courses.subscribe(courses => {
			return courses.find(c => c.id === id);
		});
		return null;
	}

	// look up a specific course from the courses collection
	// this is used for pages like course details where we only
	// want to load data for one course
	lookupCourseDocument(id: string) {
		return this.courseCollection.doc<Course>(id);
	}

}
