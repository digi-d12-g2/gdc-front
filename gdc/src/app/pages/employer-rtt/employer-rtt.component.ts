import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/enums/status';
import { Type } from 'src/app/enums/type';
import { Absence } from 'src/app/models/Absence.model';
import { PublicHoliday } from 'src/app/models/PublicHoliday.model';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationDialogComponent } from '../modal/confirmation-dialog/confirmation-dialog.component';
import { EmployerRttFormComponent } from './employer-rtt-form/employer-rtt-form.component';
import { PublicHolidayFormComponent } from './public-holiday-form/public-holiday-form.component';

@Component({
  selector: 'app-employer-rtt',
  templateUrl: './employer-rtt.component.html',
  styleUrls: ['./employer-rtt.component.css']
})
export class EmployerRttComponent implements OnInit {

  rttEmployer!: any;
  publicH!: any;
  displayedColumns: string[] = ['date_start', 'type', 'label'];
  dataSource: any;
  dataSource2: any;
  absences!: any;
  types = Type;
  signInSubscription: Subscription;
  soldeRtt!: any;
  user!: any;
  isAdmin!: boolean;
  chosenYearDate!: Date;
  finalTab!: any[];
  selectedYear!: Number;
  day!: String;

  years = [2021,2022,2023,2024,2025,2026,2027,2028];
  weekdays = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

  constructor(private absenceSrv: AbsenceService, private authSrv: AuthService, private dialog: MatDialog) {
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
    });
  }

  async ngOnInit() {
    this.user = await this.authSrv.getUser();

    this.isAdmin = this.user.is_admin;

    if(this.isAdmin) {
      this.displayedColumns = ['date_start', 'type', 'status', 'label', 'actions'];
    }

    this.selectedYear = this.years[2];
    this.refreshList(this.selectedYear);
  }

  refreshList(year: Number){
    if(this.isAdmin){
      this.absenceSrv.getRttEmployerAdmin(year).subscribe(rttEmployer => {
        this.rttEmployer = rttEmployer;

        this.absenceSrv.getPublicHolidays(year).subscribe(publicH => {
          this.publicH = publicH;
          this.finalTab = [...this.rttEmployer, ...this.publicH];
          this.dataSource = new MatTableDataSource(this.finalTab);
        });
      });
    } else {
      this.absenceSrv.getRttEmployerEmployee(year).subscribe(rttEmployer => {
        this.rttEmployer = rttEmployer;
        this.absenceSrv.getPublicHolidays(year).subscribe(publicH => {
          this.publicH = publicH;
          this.finalTab = [...this.rttEmployer, ...this.publicH];
          this.dataSource = new MatTableDataSource(this.finalTab);
        });
      });
    }


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
      this.refreshList(this.selectedYear);
    });
  }

  openAddPhDialog(publicHoliday?:PublicHoliday){
    const dialogRef = this.dialog.open(PublicHolidayFormComponent,{
      data:{
        publicHoliday: publicHoliday
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshList(this.selectedYear);
    });
  }

  openDeleteDialog(id: number, type: String) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer ?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        },
        id: id,
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshList(this.selectedYear);
    });
  }

}
