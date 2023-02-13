import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  signInSubscription: Subscription;

  constructor(
    public authSrv: AuthService
  ) {
    // user login event
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
      console.log(this.user);
    });
  }

  async logout() {
    await this.authSrv.logout();
  }

  async ngOnInit() {
    this.user = await this.authSrv.getUser();
  }

  ngOnDestroy() {
    this.signInSubscription.unsubscribe();
  }
}
