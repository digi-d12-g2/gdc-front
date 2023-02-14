import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http: HttpClient) { }

  getAbsenceFromUser(id: Number) {
    return this.http.get(`${environment.API_URL}absences/user/${id}`);
  }
}
