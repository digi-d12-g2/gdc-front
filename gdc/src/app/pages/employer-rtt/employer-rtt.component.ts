import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/enums/status';
import { Type } from 'src/app/enums/type';
import { Absence } from 'src/app/models/Absence.model';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationDialogComponent } from '../modal/confirmation-dialog/confirmation-dialog.component';
import { EmployerRttFormComponent } from './employer-rtt-form/employer-rtt-form.component';

@Component({
  selector: 'app-employer-rtt',
  templateUrl: './employer-rtt.component.html',
  styleUrls: ['./employer-rtt.component.css']
})
export class EmployerRttComponent implements OnInit {

  rttEmployer!: any;
  displayedColumns: string[] = ['date_start', 'type'];
  dataSource: any;
  absences!: any;
  types = Type;
  signInSubscription: Subscription;
  soldeRtt!: any;
  user!: any;
  isAdmin!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private absenceSrv: AbsenceService, private authSrv: AuthService, private dialog: MatDialog) {
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
    });
  }

  async ngOnInit() {
    this.user = await this.authSrv.getUser();

    this.isAdmin = this.user.is_admin;

    if(this.isAdmin) {
      this.displayedColumns = ['date_start', 'type', 'status', 'actions'];
    }

    this.refreshList();
  }

  ngAfterViewInit() {
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  refreshList(){
    this.absenceSrv.getRttEmployer().subscribe(rttEmployer => {
      this.rttEmployer = rttEmployer;
      this.dataSource = new MatTableDataSource(this.rttEmployer);
    });

    this.absenceSrv.getSoldeRttEmployer().subscribe(soldeRtt => {
      this.soldeRtt = soldeRtt;
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

  openAddDialog(absence?:Absence){
    const dialogRef = this.dialog.open(EmployerRttFormComponent,{
      data:{
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
        message: 'Etes-vous sûr de vouloir supprimer la demande de RTT employeur ?',
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

  getSimpleDate(date: string) {
    return new Date(date).toLocaleDateString('fr-FR');
  }

}
