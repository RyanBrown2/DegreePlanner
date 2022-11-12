import { Injectable, Optional, SkipSelf } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { Degree } from 'src/app/shared/models/degree.model';
import { CreditRequirement } from 'src/app/shared/models/credit-requirement.model';

const FbKeys = {
	database: 'DegreeData'
}

@Injectable({
	providedIn: 'root'
})
export class DegreeService {
	// private degreeCollection: AngularFirestoreCollection<Degree>;

	// degrees: Observable<Degree[]>;

	// csDegree: Degree = {
	// 	majorRequiredCourses: [
	// 		'csse120', 'csse132', 'csse220', 'csse230', 'csse232', 'csse280',
	// 		'csse304', 'csse332', 'csse333', 'csse371', 'csse374', 'csse473|ma473',
	// 		'csse474|ma474', 'csse487-9|csse494-6|csse497-9',
	// 	],
	// 	scienceElectiveSubjects: [
	// 		'chem', 'ph', 'geol', 'bio'
	// 	],
	// 	techElectiveCourseExclude: [
	// 		'csse372', 'csse373', 'csse375', 'csse376', 'csse477'
	// 	]
	// }

	constructor(
		public firestore: AngularFirestore,
		@Optional() @SkipSelf() sharedInstance: DegreeService
	) {
		if (sharedInstance) {
			throw new Error('DegreeService is alreaded loaded');
		}

		// this.degreeCollection = this.firestore.collection<Degree>(FbKeys.database);

		// this.degrees = this.degreeCollection.snapshotChanges().pipe(
		// 	map((actions: any[]) => actions.map(a => {
		// 		const data = a.payload.doc.data() as Degree;
		// 		return data;
		// 	}))
		// );
	}
}
