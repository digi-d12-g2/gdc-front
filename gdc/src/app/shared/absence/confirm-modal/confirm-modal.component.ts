import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AbsenceService} from "../../../services/absence/absence.service";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  message: string = "Etes-vous sûr de vouloir confirmer la demande d'absence ?"
  confirmButtonText = "Oui"
  cancelButtonText = "Non"
  confirmType !: String;
  id!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    private absenceSrv: AbsenceService) {

    this.message = data.message || this.message;
    this.id = data.id;
    this.confirmType = data.confirmType;
  }

  ngOnInit(): void {}

  async onConfirmClick() {
    if (this.confirmType == 'CONFIRM') {
        await this.absenceSrv.confirmAbsence(this.id);
    } else if(this.confirmType == 'DECLINE') {
      await this.absenceSrv.declineAbsence(this.id);
    }
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
