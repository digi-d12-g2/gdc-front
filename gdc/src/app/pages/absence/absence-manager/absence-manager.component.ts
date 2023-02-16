import { Component, OnInit } from '@angular/core';
import {Type} from "../../../enums/type";
import {AbsenceService} from "../../../services/absence/absence.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {Status} from "../../../enums/status";
import {ConfirmationDialogComponent} from "../../modal/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/absence/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-absence-manager',
  templateUrl: './absence-manager.component.html',
  styleUrls: ['./absence-manager.component.css']
})
export class AbsenceManagerComponent implements OnInit {

  displayedColumns: string[] = ['date_start', 'date_end', 'type', 'reason', 'employee', 'actions'];
  dataSource: any;
  absences!: any;
  types = Type;
  user!: any;
  signInSubscription: Subscription;
  loading: boolean = true;

  constructor(
    private absenceSrv: AbsenceService,
    private authSrv: AuthService,
    private dialog: MatDialog
  ) {
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
    });
  }

  async ngOnInit() {
    this.user = await this.authSrv.getUser();
    this.refreshList();
    this.loading = false;
  }

  refreshList(){
    this.absenceSrv.getAbsencesToValidate(this.user.id).subscribe(absences => {
      this.absences = absences;
      this.dataSource = new MatTableDataSource(this.absences);
    });
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

  confirm(id: Number, confirmType: string, confirmMessage: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        message: confirmMessage,
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        },
        id: id,
        confirmType: confirmType
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshList();
    })
  }

}
