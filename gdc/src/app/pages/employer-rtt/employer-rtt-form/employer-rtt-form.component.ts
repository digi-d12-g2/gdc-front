import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from 'src/app/enums/type';
import { Absence } from 'src/app/models/Absence.model';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { DatesService } from 'src/app/services/dates/dates.service';

@Component({
  selector: 'app-employer-rtt-form',
  templateUrl: './employer-rtt-form.component.html',
  styleUrls: ['./employer-rtt-form.component.css']
})
export class EmployerRttFormComponent implements OnInit {

  @Input() form!: FormGroup;
  absence: Absence;
  isAddMode!: boolean;

  constructor(private absenceSrv: AbsenceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EmployerRttFormComponent>,
    private datesSrv: DatesService) {
      this.absence = data.absence?data.absence:new Absence;
  }

  ngOnInit(): void {
    this.isAddMode = !this.absence.id;

    this.form = new FormGroup({
      date_start: new FormControl(this.absence.date_start, [Validators.required]),
      date_end: new FormControl(this.absence.date_end, [Validators.required]),
      type: new FormControl("RTT_EMPLOYEUR", [Validators.required])
    });
  }

  onSubmit(){
    this.form.value.date_end = this.form.value.date_start;

    this.datesSrv.transformDate(this.form);

    if (this.isAddMode) {
      this.addAbsence();
    } else {
        this.updateAbsence();
    }

    this.dialogRef.close();
  }

  private addAbsence(){
    this.absenceSrv.addAbsence(this.form.value).subscribe(absence => {
      console.log(absence);
    });
  }

  private updateAbsence(){
    this.absenceSrv.updateAbsence(this.absence.id, this.form.value).subscribe(absence => {
      console.log(absence);
    });
  }

}
