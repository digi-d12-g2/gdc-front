import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { Type } from 'src/app/enums/type';
import { Status } from 'src/app/enums/status';

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
  types = Type;
  selectedValue: string = '';

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
      this.dataSource = new MatTableDataSource(this.absences);
    });
  }

  onSubmit(){
    this.absenceSrv.addAbsence(this.form.value).subscribe(absence => {
      console.log(absence);
    })
  }

  getStringType(type: string){
    const indexOfType = Object.keys(Type).indexOf(type);
    const valueOfType = Object.values(Type)[indexOfType];

    return valueOfType;
  }

  getStringStatus(status: string){
    const indexOfType = Object.keys(Status).indexOf(status);
    const valueOfType = Object.values(Status)[indexOfType];

    return valueOfType;
  }
}
