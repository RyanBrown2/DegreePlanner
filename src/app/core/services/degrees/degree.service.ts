import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Degree } from './degree';

const FbKeys = {
	database: "DegreeData"
}

@Injectable({
	providedIn: 'root'
})
export class DegreeService {

	private degreeCollection: AngularFirestoreCollection<Degree>;

	degrees: Observable<Degree[]>;

	constructor(
		public firestore: AngularFirestore
	) {
		this.degreeCollection = this.firestore.collection<Degree>(FbKeys.database);

		this.degrees = this.degreeCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Degree;
				return data;
			}))
		);
	}

	addDegree(degree: Degree) {
		this.degreeCollection.doc(degree.id).set(degree);
	}

	getDegrees(): Observable<Degree[]> {
		return this.degrees;
	}

	getDegree(id: string) {
		this.degrees.subscribe(degrees => {
			return degrees.find(d => d.id === id);
		});
	}


	
}
