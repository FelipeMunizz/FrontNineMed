import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paciente } from 'app/shared/models/paciente.model';
import { User } from 'app/shared/models/user.model';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent implements OnInit {
  user: User = {}
  dispplayColuns: string[] = ['id', 'nome', 'rg', 'cpf'];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource<Paciente>();
  tipoTela: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: JwtAuthService,
    private router: Router,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.ListaPaciente();
  }

  ListaPaciente() {
    this.tipoTela = 1;
    this.pacienteService.ListaPacientesClinica(+this.user.idClinica)
      .subscribe((pacientes) => {
        this.dataSource = new MatTableDataSource(pacientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  NavigateAtendimento(idPaciente: number){
    this.router.navigateByUrl(`atendimento/atendimento?idPaciente=${idPaciente}`)
  }


  //Metodos auxiliares
  AplicaFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
