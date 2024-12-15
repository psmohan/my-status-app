import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['.login-container { text-align: center; }'],
})
export class LoginComponent {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  /**
   * Logs in the user using Google authentication and redirects to the dashboard on success.
   */
  loginWithGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider()) // Initiates Google sign-in via popup
      .then(() => {
        this.router.navigate(['/dashboard']); // Redirects to the dashboard upon successful login
      })
      .catch((err) => console.error(err)); // Logs any errors that occur during login
  }

  /**
   * Checks if the user is already authenticated on component initialization.
   * Redirects to the dashboard if a user is found.
   */
  ngOnInit(): void {
    this.auth.authState.subscribe((response) => {
      if (response) {
        this.router.navigate(['/dashboard']); // Redirects if the user is already logged in
      }
    });
  }
}
