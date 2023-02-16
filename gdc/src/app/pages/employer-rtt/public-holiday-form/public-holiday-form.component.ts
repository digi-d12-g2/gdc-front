import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicHoliday } from 'src/app/models/PublicHoliday.model';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { DatesService } from 'src/app/services/dates/dates.service';

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
    private dialogRef: MatDialogRef<PublicHolidayFormComponent>,
    private datesSrv: DatesService) {
      this.publicHoliday = data.publicHoliday?data.publicHoliday:new PublicHoliday;
  }

  ngOnInit(): void {
    this.isAddMode = !this.publicHoliday.id;

    this.form = new FormGroup({
      date: new FormControl(this.publicHoliday.date, [Validators.required]),
      label: new FormControl(this.publicHoliday.label, [Validators.required])
    });
  }

  onSubmit(){
    this.datesSrv.transformDate(this.form);

    if (this.isAddMode) {
      this.addPublicHoliday();
    } else {
      this.updatePublicHoliday();
    }

    this.dialogRef.close();
  }

  private addPublicHoliday(){
    this.absenceSrv.addPublicHoliday(this.form.value).subscribe(publicHoliday => {
      console.log(publicHoliday);
    });
  }

  private updatePublicHoliday(){
    this.absenceSrv.updatePublicHoliday(this.publicHoliday.id, this.form.value).subscribe(publicHoliday => {
      console.log(publicHoliday);
    });
  }
}
