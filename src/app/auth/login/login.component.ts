import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@firebase/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['.login-container { text-align: center; }'],
})
export class LoginComponent {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  loginWithGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => console.error(err));
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((response) => {
      if (response) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
