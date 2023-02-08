import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  displayedColumns: string[] = ['date_start', 'date_end', 'type', 'reason', 'status'];
  dataSource: any;

  absences!: any;

  form: FormGroup;

  constructor(private absenceSrv: AbsenceService) {
    this.form = new FormGroup({
      date_start: new FormControl(null, [Validators.required]),
      date_end: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      reason: new FormControl(null),
      userId: new FormControl(1)
    });
  }

  ngOnInit(): void {
    this.absenceSrv.getAbsences(1).subscribe(absences => {
      this.absences = absences;
      console.log(this.absences);
      this.dataSource = new MatTableDataSource(this.absences);
    });
  }

  onSubmit(){
    this.absenceSrv.addAbsence(this.form.value).subscribe(absence => {
      console.log(absence);
    })

  }

}