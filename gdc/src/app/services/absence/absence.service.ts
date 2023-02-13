import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/Absence.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {

  constructor(private http: HttpClient) {}

  /** absences */
  getAbsences(id: Number) {
    return this.http.get(`${environment.API_URL}absences/user/${id}`);
  }

  addAbsence(absence: Absence){
    return this.http.post(`${environment.API_URL}absences`, absence);
  }

  updateAbsence(id: Number, absence: Absence){
    return this.http.put(`${environment.API_URL}absences/${id}`, absence);
  }

  deleteAbsence(id: Number){
    return this.http.delete(`${environment.API_URL}absences/${id}`);
  }

  /** RTT employeur */
  getRttEmployer() {
    return this.http.get(`${environment.API_URL}absences/rtt_employer`);
  }

  getSoldeRttEmployer() {
    return this.http.get(`${environment.API_URL}rtt_employer`);
  }
}
