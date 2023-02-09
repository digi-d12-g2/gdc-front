import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Type } from 'src/app/enums/type';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() elementId!: number;
  selectedValue: string = '';
  types = Type;
  isAddMode!: boolean;

  constructor(private absenceSrv: AbsenceService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      date_start: new FormControl('', [Validators.required]),
      date_end: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      reason: new FormControl(''),
      userId: new FormControl(1)
    });
  }


  ngOnInit(): void {
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
