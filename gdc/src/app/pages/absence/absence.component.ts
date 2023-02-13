import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { Type } from 'src/app/enums/type';
import { Status } from 'src/app/enums/status';
import { ConfirmationDialogComponent } from '../modal/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { AbsenceFormComponent } from './absence-form/absence-form.component';
import { Absence } from 'src/app/models/Absence.model';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  displayedColumns: string[] = ['date_start', 'date_end', 'type', 'reason', 'status', 'actions'];
  dataSource: any;
  absences!: any;
  types = Type;
  selectedValue: string = '';
  user!: any;
  signInSubscription: Subscription;
  soldeRtt!: any;
  loading: boolean = true;

  constructor(private absenceSrv: AbsenceService, private dialog: MatDialog, private authSrv: AuthService) {
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
    });
  }

  async ngOnInit() {
    this.user = await this.authSrv.getUser();
    this.refreshList();
    this.loading = false;
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

  openAddDialog(absence?:Absence){
    const dialogRef = this.dialog.open(AbsenceFormComponent,{
      data:{
        userId: this.user.id,
        absence: absence
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir annuler la demande d\'absence ?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        },
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  refreshList(){
    this.absenceSrv.getAbsences(this.user.id).subscribe(absences => {
      this.absences = absences;
      this.dataSource = new MatTableDataSource(this.absences);
    });

    this.absenceSrv.getSoldeRttEmployer().subscribe(soldeRtt => {
      this.soldeRtt = soldeRtt;
    });
  }
}
