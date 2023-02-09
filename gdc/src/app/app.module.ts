import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/auth/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbsenceComponent } from './pages/absence/absence.component';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AbsenceFormComponent } from './pages/absence/absence-form/absence-form.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployerRttFormComponent } from './pages/employer-rtt/employer-rtt-form/employer-rtt-form.component';
import { ConfirmationDialogComponent } from './pages/modal/confirmation-dialog/confirmation-dialog.component';
import { EmployerRttComponent } from './pages/employer-rtt/employer-rtt.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AbsenceComponent, LayoutComponent, AbsenceFormComponent, ConfirmationDialogComponent, EmployerRttComponent, EmployerRttFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
