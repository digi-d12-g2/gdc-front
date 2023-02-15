import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicHoliday } from 'src/app/models/PublicHoliday.model';
import { AbsenceService } from 'src/app/services/absence/absence.service';

@Component({
  selector: 'app-public-holiday-form',
  templateUrl: './public-holiday-form.component.html',
  styleUrls: ['./public-holiday-form.component.css']
})
export class PublicHolidayFormComponent implements OnInit {

  @Input() form!: FormGroup;
  publicHoliday: PublicHoliday;
  isAddMode!: boolean;

  constructor(private absenceSrv: AbsenceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PublicHolidayFormComponent>) {
      this.publicHoliday = data.publicHoliday?data.publicHoliday:new PublicHoliday;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      label: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    this.addPublicHoliday();
    this.dialogRef.close();
  }

  private addPublicHoliday(){
    this.absenceSrv.addPublicHoliday(this.form.value).subscribe(publicHoliday => {
      console.log(publicHoliday);
    });
  }
}
