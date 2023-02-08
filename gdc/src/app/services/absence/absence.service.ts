import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {

  constructor(private http: HttpClient) {}

  getAbsences(id: Number) {
    return this.http.get(`${environment.API_URL}absences/user/${id}`);
  }

}
