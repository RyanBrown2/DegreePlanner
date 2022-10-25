import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

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
      } else {
        localStorage.setItem('user', 'null');
      }
      JSON.parse(localStorage.getItem('user')!);
    });
  }

  // Return true when logged in
  getLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Sign in with google
  GoogleLogin() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']); // TODO sign in redirect
    })
  }

  // Logic for providers
  AuthLogin(provider: any) {
    return this.fAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']); // TODO sign in redirect
        this.SetUserData(result.user);
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
    }

    return userRef.set(userData, { merge: true });
  }

  SignOut() {
    return this.fAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']); // TODO signout redirect
    });
  }
}
