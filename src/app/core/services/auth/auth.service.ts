import { Injectable, NgZone, Optional, SkipSelf } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { RoseFire, RosefireUser } from './rosefire';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	userData: any;
	
	rosefireKey: Observable<any>;	

	constructor(
		public firestore: AngularFirestore,
		public fAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone,
		private functions: AngularFireFunctions,
		@Optional() @SkipSelf() sharedService?: AuthService
	) {
		if (sharedService) {
			throw new Error('AuthService is already loaded');
		}

		const callable = functions.httpsCallable('rosefireKey');

		this.rosefireKey = callable({ name: `${environment.rosefire}`});

		this.fAuth.authState.subscribe((user) => {
			if (user) {
				this.userData = user;
				
				localStorage.setItem('user', JSON.stringify(this.userData));
				if (this.router.url == '/sign-in') {
					this.router.navigate(['dashboard']);
				}
			} else {
				localStorage.setItem('user', 'null');
			}
			JSON.parse(localStorage.getItem('user')!);
		});
	}

	// Return true when logged in
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user')!);
		return user !== null ? true : false;
	}

	// Sign in with google
	GoogleLogin() {
		return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
			this.router.navigate(['dashboard']);
		})
	}

	// Sign in with rosefire
	RoseLogin() {
		RoseFire.signIn(environment.rosefire, (err: any, rfUser: RosefireUser) => {
			if (err) {
				console.error(err);
				return;
			}
			return this.fAuth.signInWithCustomToken(rfUser.token)
			.then((result) => {
				if (result.user != null) {
					const user: User = {
						uid: result.user?.uid,
						displayName: rfUser.name,
						email: rfUser.email,
						emailVerified: true
					}
					
					this.SetUserData(user);
					this.router.navigate(['dashboard']);
				}
				// if (user != null) {
				// 	user.email = rfUser.email;
				// 	user.displayName = rfUser.name;
				// }
				
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode === 'auth/invalid-custom-token') {
					alert('The token you provide is not valid.');
				} else {
					console.error("Custom auth error", errorCode, errorMessage);
				}
			});
		});
	}

	// Logic for providers
	AuthLogin(provider: any) {
		return this.fAuth
		.signInWithPopup(provider)
		.then((result) => {
			this.SetUserData(result.user);
			this.router.navigate(['dashboard']);
		})
		.catch((error) => {
			window.alert(error);
		});
	}

	// Handle user data on firestore
	SetUserData(user: any) {
		const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);

		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			emailVerified: user.emailVerified,
		};

		return userRef.set(userData, { merge: true, });
	}

	SignOut() {
		return this.fAuth.signOut().then(() => {
		localStorage.removeItem('user');
		this.router.navigate(['sign-in']); // TODO signout redirect
		});
	}
}
