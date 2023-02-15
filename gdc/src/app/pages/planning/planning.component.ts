import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import {AbsenceService} from "../../services/absence/absence.service";

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
    eventDidMount: this.eventDidMount.bind(this)
  };
  signInSubscription: Subscription;
  user!: any;

  constructor(
    private absenceSrv: AbsenceService,
    private authSrv: AuthService
  ) {
    this.signInSubscription = this.authSrv.signInEvent.subscribe(async () => {
      this.user = await this.authSrv.getUser();
    });
  }

  async ngOnInit() {
    this.user = await this.authSrv.getUser();
    this.absenceSrv.getAbsencesFromUser(this.user.id).subscribe((res) => {
      this.calendarOptions.events = [];
      const data = Object.entries(res).map((val: any) => {
        return val;
      });
      for (let i = 0; i < data.length; i++) {
        this.calendarOptions.events.push({
          title: data[i][1]['type'],
          start: new Date(data[i][1]['date_start']),
          end: new Date(data[i][1]['date_end']),
          className: data[i][1]['type']
        });
      }
    });
  }

  eventDidMount(info: any) {
    const event = info.event;
    const element = info.el;
    switch (event.title) {
      case 'CONGES_SANS_SOLDE':
        element.style.backgroundColor = 'IndianRed';
        break;
      case 'RTT_EMPLOYE':
        element.style.backgroundColor = 'LightGreen';
        break;
      case 'RTT_EMPLOYEUR':
        element.style.backgroundColor = 'MediumOrchid';
        break;
    }
    const titleElement = element.querySelector('.fc-title');
    if (titleElement) {
      titleElement.innerHTML = event.title;
    }
  }
}
