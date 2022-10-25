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

  getLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Logic for providers
  AuthLogin(provider: any) {
    return this.fAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['']);
        // TODO store user data on firestore
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
