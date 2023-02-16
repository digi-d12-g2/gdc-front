import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/Absence.model';
import { PublicHoliday } from 'src/app/models/PublicHoliday.model';
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

  /** absences */
  getAbsencesToValidate(id: Number) {
    return this.http.get(`${environment.API_URL}absences/manager/${id}`);
  }

  addAbsence(absence: Absence){
    return this.http.post(`${environment.API_URL}absences`, absence);
  }

  updateAbsence(id: Number, absence: Absence) {
    return this.http.put(`${environment.API_URL}absences/${id}`, absence);
  }

  deleteAbsence(id: Number) {
    return this.http.delete(`${environment.API_URL}absences/${id}`);
  }

  async confirmAbsence(id: Number){
    return await this.http.get(`${environment.API_URL}absences/confirm/${id}`).toPromise();
  }

  async declineAbsence(id: Number){
    return await this.http.get(`${environment.API_URL}absences/decline/${id}`).toPromise();
  }

  /** RTT employeur */
  getRttEmployerAdmin(year: Number) {
    return this.http.get(`${environment.API_URL}absences/rtt_employer_admin/${year}`);
  }

  getRttEmployerEmployee(year: Number) {
    return this.http.get(`${environment.API_URL}absences/rtt_employer_employee/${year}`);
  }

  getSoldeRttEmployer() {
    return this.http.get(`${environment.API_URL}rtt_employer`);
  }

  /** jours fériés */
  getPublicHolidays(year: Number) {
    return this.http.get(`${environment.API_URL}public-holidays/${year}`);
  }

  addPublicHoliday(publicHoliday: PublicHoliday){
    return this.http.post(`${environment.API_URL}public-holidays`, publicHoliday);
  }

  deletePublicHoliday(id: Number){
    return this.http.delete(`${environment.API_URL}public-holidays/${id}`);
  }
}
