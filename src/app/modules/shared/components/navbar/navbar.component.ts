import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/api/auth/models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AuthFacade } from 'src/app/modules/auth/store/auth-state/auth.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
    public authFacade: AuthFacade,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authFacade.loadUser();
  }

  logout() {
    this.authFacade.logout();
  }

  moveToLoginPage() {
    this.router.navigate(['sign_in']);
  }

  moveToRegisterPage() {
    this.router.navigate(['sign_up']);
  }

  moveToProfilePage(user: User) {
    this.router.navigate([`users/${user.identification.id}/profile`]);
  }

  moveToBookcasePage(user:User){
    this.router.navigate([`bookcase/reader/${user.identification.id}`]);
  }

  moveToFollowersPage(user: User) {
    this.router.navigate([`users/${user.identification.id}/followers`])
  }

  moveToCommentsPage(user: User) {
    this.router.navigate([`users/${user.identification.id}/reviews`])
  }

  moveToLibrarians() {
    this.router.navigate([`librarians/manage`]);
  }

  moveToTickets(user: User) {
    this.router.navigate([`tickets/user/${user.identification.id}`]);
  }

  isSuperAdmin(user: User) {
    return user.roles.includes('SuperAdmin');
  }

  isLibrarian(user: User) {
    return user.roles.includes('Librarian');
  }



}
