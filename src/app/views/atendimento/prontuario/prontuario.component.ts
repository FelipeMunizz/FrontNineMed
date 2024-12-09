import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Atendimento } from 'app/shared/models/atendimento.model';
import { Paciente } from 'app/shared/models/paciente.model';
import { User } from 'app/shared/models/user.model';
import { AgendamentoService } from 'app/shared/services/app-models/agendamento.service';
import { AtendimentoService } from 'app/shared/services/app-models/atendimento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent implements OnInit {
  user: User = {}
  dispplayColuns: string[] = ['id', 'nome', 'rg', 'cpf', 'agendamento', 'acao'];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource<Paciente>();
  tipoTela: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: JwtAuthService,
    private router: Router,
    private agendamentoService: AgendamentoService,
    private atendimentoService: AtendimentoService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.ListaPaciente();
  }

  ListaPaciente() {
    this.tipoTela = 1;
    this.agendamentoService.AgendamentosAtendimento(+this.user.idFuncionario)
      .subscribe((agendamentos) => {
        this.dataSource = new MatTableDataSource(agendamentos.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  NavigateAtendimento(idPaciente: number){
    this.router.navigateByUrl(`atendimento/atendimento?cd=${idPaciente}`)
  }

  AdicionarAtendimento(agendamento: any){
    var atendimento = new Atendimento();
    atendimento.idAgendamento = agendamento.IdAgendamento;   
    const idPaciente = agendamento.CodCliente;

    this.atendimentoService.AdicionarAtendimento(atendimento).subscribe(
      (response) => {
        this.NavigateAtendimento(idPaciente)
      }
    );
  }


  //Metodos auxiliares
  AplicaFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public formatDate(dateString: string): string {

    const cleanDateString = dateString.split('.')[0];

    return cleanDateString
}
}
