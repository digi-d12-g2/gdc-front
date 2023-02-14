import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AbsenceComponent } from './pages/absence/absence.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { EmployerRttComponent } from './pages/employer-rtt/employer-rtt.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { AbsenceManagerComponent } from './pages/absence/absence-manager/absence-manager.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'auth', component: LoginComponent },
      { path: 'absence', component: AbsenceComponent },
      { path: 'employer_rtt', component: EmployerRttComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'management', component: AbsenceManagerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
