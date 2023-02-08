import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/Absence.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {

  constructor(private http: HttpClient) {}

  getAbsences(id: Number) {
    return this.http.get(`${environment.API_URL}absences/user/${id}`);
  }

  addAbsence(absence: Absence){
    return this.http.post(`${environment.API_URL}absences`, absence);
  }

}