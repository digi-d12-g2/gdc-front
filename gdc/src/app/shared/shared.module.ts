import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {RouterModule} from "@angular/router";
import { ConfirmModalComponent } from './absence/confirm-modal/confirm-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [NavbarComponent, ConfirmModalComponent],
    imports: [CommonModule, MatToolbarModule, MatButtonToggleModule, MatDialogModule, MatButtonModule, RouterModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
