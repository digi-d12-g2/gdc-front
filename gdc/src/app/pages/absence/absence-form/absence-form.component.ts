import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/app/enums/type';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() elementId!: number;
  @Input() userId!: number;
  selectedValue: string = '';
  types = Type;
  isAddMode!: boolean;

  constructor(private absenceSrv: AbsenceService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      date_start: new FormControl(null, [Validators.required]),
      date_end: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      reason: new FormControl(null),
      userId: new FormControl(this.userId)
    });
  }

  onSubmit(){
    this.isAddMode = !this.elementId;

    if (this.isAddMode) {
      this.addAbsence();
    } else {
        this.updateAbsence();
    }
  }

  private addAbsence(){
    // console.log(this.user.id);
    this.absenceSrv.addAbsence(this.form.value).subscribe(absence => {
      console.log(absence);
    });
  }

  private updateAbsence(){
    this.absenceSrv.updateAbsence(this.elementId, this.form.value).subscribe(absence => {
      console.log(absence);
    });
  }

  getStringType(type: string){
    const indexOfType = Object.keys(Type).indexOf(type);
    const valueOfType = Object.values(Type)[indexOfType];

    return valueOfType;
  }
}
