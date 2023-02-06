import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async storeUser(email: String, password: String) {
    const user: any = await this.http.get(
      `${environment.API_URL}/user?email=${email}&password=${password}`
    );
    await localStorage.setItem('user', user);
  }
}
