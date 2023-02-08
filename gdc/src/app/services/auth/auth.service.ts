import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  storeUser(email: String, password: String) {
    return this.http.get(
      `http://localhost:8080/user?email=${email}&password=${password}`
    );
  }
}
