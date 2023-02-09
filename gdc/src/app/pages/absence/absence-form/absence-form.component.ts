import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from 'src/app/enums/type';
import { Absence } from 'src/app/models/Absence.model';
import { AbsenceService } from 'src/app/services/absence/absence.service';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  @Input() form!: FormGroup;
  userId!: number;
  absence: Absence;
  selectedValue: string = '';
  types = Type;
  isAddMode!: boolean;


  constructor(private absenceSrv: AbsenceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AbsenceFormComponent>) {

      this.userId = data.userId;
      this.absence = data.absence?data.absence:new Absence;
  }

  ngOnInit(): void {
    this.isAddMode = !this.absence.id;

    this.form = new FormGroup({
      date_start: new FormControl(this.absence.date_start, [Validators.required]),
      date_end: new FormControl(this.absence.date_end, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      reason: new FormControl(this.absence.reason),
      userId: new FormControl(this.userId)
    });
  }

  onSubmit(){

    if (this.isAddMode) {
      this.addAbsence();
    } else {
        this.updateAbsence();
    }

    this.dialogRef.close();
  }

  private addAbsence(){
    console.log(this.form.value);
    this.absenceSrv.addAbsence(this.form.value).subscribe(absence => {
      console.log(absence);
    });
  }

  private updateAbsence(){
    this.absenceSrv.updateAbsence(this.absence.id, this.form.value).subscribe(absence => {
      console.log(absence);
    });
  }

  getStringType(type: string){
    const indexOfType = Object.keys(Type).indexOf(type);
    const valueOfType = Object.values(Type)[indexOfType];

    return valueOfType;
  }
}
