import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  signInEvent = new Subject<void>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: StorageMap
  ) {}

  login(email: String, password: String) {
    return this.http.get(
      `${environment.API_URL}user?email=${email}&password=${password}`
    );
  }

  async storeUser(user: any) {
    await this.storage.set('user', user).toPromise();
    this.signInEvent.next();
    await this.router.navigate(['/absence']);
  }

  getUser() {
    const user = this.storage.get('user').toPromise();
    if (user) {
      return user;
    } else {
      this.router.navigate(['/auth']);
      return null;
    }
  }

  async logout() {
    await this.storage.delete('user').toPromise();
    this.signInEvent.next();
    await this.router.navigate(['/auth']);
  }

  getVacationsAvalaible(id: number){
    return this.http.get(
      `${environment.API_URL}user/vacations_avalaible/${id}`
    );
  }
}
