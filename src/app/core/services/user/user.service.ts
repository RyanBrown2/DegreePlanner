import { Injectable, Optional, SkipSelf } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserData } from 'src/app/shared/models/user-data.model';
import { AuthService } from '../auth/auth.service';

import { map, switchMap } from 'rxjs/operators';

const FbKeys = {
	database: 'userData'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private userCollection: AngularFirestoreCollection<UserData>;

	uid: string;

  constructor(
		public firestore: AngularFirestore,
		@Optional() @SkipSelf() sharedService?: AuthService
	) { 
		if (sharedService) {
			throw new Error('UserService is already loaded');
		}


		this.uid = JSON.parse(localStorage.getItem('user')!).uid;

		this.userCollection = this.firestore.collection(FbKeys.database);

	}

	loadUser(uid?: string) {
		if (uid == null) {
			uid = this.uid;
		}
		// console.log(uid);

		let doc: AngularFirestoreDocument = this.userCollection.doc(uid);

		doc.get().subscribe(ref => {
			if (!ref.exists) {
				
			}
		});

		// this.userCollection.doc(uid).snapshotChanges().pipe(
		// 	map(a => {
		// 		console.log(a);
		// 	})
		// )
		// TODO
	}
}
