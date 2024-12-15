import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  logout() {
    this.auth
      .signOut()
      .then(() => {
        console.log('User logged out');
        this.router.navigate(['/login']);
      })
      .catch((err) => console.error('Logout error:', err));
  }
}
