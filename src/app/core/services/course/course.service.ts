import { Injectable, Optional, SkipSelf } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Course } from 'src/app/shared/models/course.model';
import { GetMockCourses } from './mock-courses';

const FbKeys = {
  database: 'CourseData',
  reportDatabase: 'ReportedCourses'
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
	private courseCollection: AngularFirestoreCollection<Course>;
	private reportCollection: AngularFirestoreCollection;

	courses: Observable<Course[]>;
  
	constructor(
		public firestore: AngularFirestore,
		@Optional() @SkipSelf() sharedInstance: CourseService
	) {
		if (sharedInstance) {
			throw new Error('CourseService is alreaded loaded');
		}
		this.courseCollection = this.firestore.collection<Course>(FbKeys.database);
		this.reportCollection = this.firestore.collection(FbKeys.reportDatabase);
	
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
				// return a.payload.doc.data() as Course;
					return new Course().deserialize(a.payload.doc.data());
				}))
			);
		} else if (subject != null && number == null) {
			this.courses = this.firestore.collection<Course>(FbKeys.database, ref => {
				return ref.orderBy('id').where('subject', '==', subject).limit(30);
			}).snapshotChanges().pipe(
				map(actions => actions.map(a => {
				// return a.payload.doc.data() as Course;
					return new Course().deserialize(a.payload.doc.data());
				}))
			);
		} else if (subject == null && number != null) {
			this.courses = this.firestore.collection<Course>(FbKeys.database, ref => {
				return ref.orderBy('id').where('number', '==', number).limit(30);
			}).snapshotChanges().pipe(
				map(actions => actions.map(a => {
				return new Course().deserialize(a.payload.doc.data());

				// return a.payload.doc.data() as Course;
				}))
			);
		} else {
			this.courses = this.courseCollection.snapshotChanges().pipe(
				map(actions => actions.map(a => {
					return new Course().deserialize(a.payload.doc.data());
					// const data = a.payload.doc.data() as Course;
					// return data;
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
	lookupCourseDocument(id: string): Observable<Course> {
		return this.courseCollection.doc<Course>(id).snapshotChanges().pipe(
			map(a => {
				return new Course().deserialize(a.payload.data());
			})
		);
	}

	reportCourse(course: Course, reportString: string) {

		const reportData = JSON.parse(reportString);

		let doc: AngularFirestoreDocument = this.reportCollection.doc(course.id);

		doc.get().subscribe(ref => {
			if (!ref.exists) {
				doc.set(reportData);
			} else {
				const data = ref.data();
				let title = data?.['title'];
				if (!title) {
					doc.update({title: reportData.title});
				}
				let prereqs = data?.['prereqs'];
				if(!prereqs) {
					doc.update({prereqs: reportData.prereqs});
				}
			}
		});
	}

}
