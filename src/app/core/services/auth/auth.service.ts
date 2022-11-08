import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import "rosefire";
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	userData: any;

	constructor(
		public firestore: AngularFirestore,
		public fAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
	) {
		this.fAuth.authState.subscribe((user) => {
		if (user) {
			this.userData = user;
			localStorage.setItem('user', JSON.stringify(this.userData));
			if (this.router.url == '/public/sign-in') {
				this.router.navigate(['protected']);
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
			this.router.navigate(['protected']); // TODO sign in redirect
		})
	}

	// Sign in with rosefire
	RoseLogin() {
		Rosefire.signIn(environment.rosefire, (err, rfUser: RosefireUser) => {
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
					this.router.navigate(['protected']);
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
			this.router.navigate(['protected']); // TODO sign in redirect
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
		this.router.navigate(['public/sign-in']); // TODO signout redirect
		});
	}
}
