import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject, forkJoin } from 'rxjs';
import { EventColor } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { PacienteModalComponent } from 'app/views/cadastros/paciente/modals/paciente.modal.component';
import { AgendamentoService } from 'app/shared/services/app-models/agendamento.service';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { Agendamento } from 'app/shared/models/agendamento.model';
import { User } from 'app/shared/models/user.model';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { Paciente } from 'app/shared/models/paciente.model';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Router } from '@angular/router';
import { ChamadaSenhaModalComponent } from 'app/views/dashboard/analytics/chamada-senha-modal/chamada-senha-modal.component';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})

export class AgendaComponent implements OnInit {
  user: User = {}
  view: CalendarView = CalendarView.Month;
  listaAgendamentos: Array<Agendamento>
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  constructor(
    private router: Router,
    private modal: MatDialog,
    private agendamentoService: AgendamentoService,
    private pacienteService: PacienteService,
    private authService: JwtAuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.ListaAgendamentos();
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = false;

  ListaAgendamentos(): void {
    this.agendamentoService.ListarAgendamentosClinica(+this.user.idClinica)
      .subscribe((response) => {
        this.listaAgendamentos = response;
        const observables = this.listaAgendamentos.map(agendamento =>
          this.pacienteService.ObterPaciente(agendamento.idPaciente)
        );

        forkJoin(observables).subscribe((pacientes) => {
          this.events = this.listaAgendamentos.map((agendamento, index) =>
            this.mapToCalendarEvent(agendamento, pacientes[index])
          );
        });
      },
        (error) => {
          console.log(error);
        }
      );
  }

  private mapToCalendarEvent(agendamento: Agendamento, paciente: Paciente): CalendarEvent {
    return {
      start: new Date(agendamento.dataAgendamento),
      title: paciente.nome + ' ' + agendamento.horaAgendamento,
      color: { ...colors.blue },
      allDay: false,
      meta: agendamento
    };
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    const dialogRef = this.modal.open(AgendamentoComponent, {
      width: '100vh',
      height: 'auto',
      data: {agendamento: event.meta}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.ListaAgendamentos();
    });
  }

  addEvent(): void {
    const dialogRef = this.modal.open(AgendamentoComponent, {
      width: '100vh',
      height: 'auto',
      data: {agendamento: undefined}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.ListaAgendamentos();
    });
  }

  CadastroPaciente(){
    this.router.navigateByUrl('cadastros/paciente?tipoTela=2')
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
  openModalChamada() {
    const dialogRef = this.modal.open(ChamadaSenhaModalComponent, {
      width: '50%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
