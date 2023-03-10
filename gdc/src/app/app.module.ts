import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/auth/login/login.component';
import { AbsenceComponent } from './pages/absence/absence.component';
import { LayoutComponent } from './layout/layout.component';
import { AbsenceFormComponent } from './pages/absence/absence-form/absence-form.component';
import { EmployerRttFormComponent } from './pages/employer-rtt/employer-rtt-form/employer-rtt-form.component';
import { ConfirmationDialogComponent } from './pages/modal/confirmation-dialog/confirmation-dialog.component';
import { EmployerRttComponent } from './pages/employer-rtt/employer-rtt.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from './shared/shared.module';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AbsenceManagerComponent } from './pages/absence/absence-manager/absence-manager.component';
import { PublicHolidayFormComponent } from './pages/employer-rtt/public-holiday-form/public-holiday-form.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AbsenceComponent,
    LayoutComponent,
    AbsenceFormComponent,
    ConfirmationDialogComponent,
    EmployerRttComponent,
    EmployerRttFormComponent,
    AbsenceManagerComponent,
    AppComponent,
    LoginComponent,
    AbsenceComponent,
    LayoutComponent,
    AbsenceFormComponent,
    ConfirmationDialogComponent,
    EmployerRttComponent,
    EmployerRttFormComponent,
    PlanningComponent,
    PublicHolidayFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
