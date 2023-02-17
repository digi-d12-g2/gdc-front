import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlanningService } from 'src/app/services/planning/planning.service';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    eventDidMount: this.eventDidMount.bind(this),
  };
  signInSubscription: Subscription;
  user!: any;
  soldeRtt!: any;

  constructor(
    private planningSrv: PlanningService,
    private absenceSrv: AbsenceService,
    private authSrv: AuthService
  ) {
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
    });
  }

  async ngOnInit() {
    this.absenceSrv.getSoldeRttEmployer().subscribe(soldeRtt => {
      this.soldeRtt = soldeRtt;
    });

    this.user = await this.authSrv.getUser();

    const currentYear = new Date().getFullYear();
    const rttEmployerEvents$ =
      this.absenceSrv.getRttEmployerEmployee(currentYear);
    const publicHolidayEvents$ = this.absenceSrv.getPublicHolidays(currentYear);
    const userAbsenceEvents$ = this.planningSrv.getAbsenceFromUser(
      this.user.id
    );

    forkJoin([
      rttEmployerEvents$,
      publicHolidayEvents$,
      userAbsenceEvents$,
    ]).subscribe(
      ([rttEmployerEvents, publicHolidayEvents, userAbsenceEvents]) => {
        const allEvents: {
          title: string;
          start: Date | string;
          end: Date | string;
          className: string;
        }[] = [];

        Object.entries(rttEmployerEvents).forEach(([, val]: any) => {
          allEvents.push({
            title: val.type,
            start: val.date_start,
            end: val.date_end,
            className: 'RTT_EMPLOYER',
          });
        });

        Object.entries(publicHolidayEvents).forEach(([, val]: any) => {
          allEvents.push({
            title: val.label,
            start: val.date,
            end: val.date,
            className: 'PUBLIC_HOLIDAY',
          });
        });

        Object.entries(userAbsenceEvents).forEach(([, val]: any) => {
          const startDate = new Date(val.date_start);
          const endDate = new Date(val.date_end);

          if (val.status !== 'REJETEE') {
            allEvents.push({
              title: val.type,
              start: startDate,
              end: endDate,
              className: val.type,
            });
          }
        });

        this.calendarOptions.events = allEvents;
      }
    );
  }

  eventDidMount(info: any) {
    const event = info.event;
    const element = info.el;
    switch (event.title) {
      case 'CONGES_SANS_SOLDE':
        element.style.backgroundColor = 'IndianRed';
        break;
      case 'RTT_EMPLOYE':
        element.style.backgroundColor = 'MediumSeaGreen';
        break;
      case 'RTT_EMPLOYEUR':
        element.style.backgroundColor = 'MediumOrchid';
        break;
      case 'CONGES_PAYES':
        element.style.backgroundColor = 'RoyalBlue';
        break;
      default:
        element.style.backgroundColor = 'DarkOrange';
        break;
    }
    const titleElement = element.querySelector('.fc-title');
    if (titleElement) {
      titleElement.innerHTML = event.title;
    }
  }
}
