import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbsenceService } from 'src/app/services/absence/absence.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  message: string = "Etes-vous sûr de vouloir annuler la demande d'absence ?"
  confirmButtonText = "Oui"
  cancelButtonText = "Non"
  id!: number;
  type!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private absenceSrv: AbsenceService) {

      if(data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
      this.id = data.id;
      this.type = data.type;
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);

    if(this.type !== undefined){
      this.absenceSrv.deletePublicHoliday(this.id).subscribe(result => {
        console.log(result);
        location.reload();
      });
    } else {
      this.absenceSrv.deleteAbsence(this.id).subscribe(result => {
        console.log(result);
        location.reload();
      });
    }

  }

}
