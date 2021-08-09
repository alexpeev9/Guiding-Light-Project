import { Injectable,NgZone, Output  } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

import { IUser } from "src/app/models/interfaces/iuser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  @Output()
  get errorMsg() {
    return this.errorMessage;
  }

  errorMessage!: string;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('userEmail', this.userData.email);
      } else {
        localStorage.setItem('user',JSON.stringify(null));
        JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user',JSON.stringify(null));
      }
    })
  }

  // Sign in with email/password
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        this.errorMessage = error.message
      })
  }

  // Sign up with email/password
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        this.errorMessage = error.message
      })
  }

  // Returns true when user is looged
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null) ? true : false;
  }
  
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      email: user.email,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  checkIfAuthorMatches(author: string): boolean{
    if(localStorage.getItem('userEmail') == author)
    {
      return true;
    }
    return false;

  }
  // Sign out 
  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
    })
  }

}