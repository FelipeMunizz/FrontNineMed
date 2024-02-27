import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Convenio } from 'app/shared/models/convenio.model';
import { User } from 'app/shared/models/user.model';
import { ConvenioService } from 'app/shared/services/app-models/convenio.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.scss']
})
export class ConvenioComponent implements OnInit {
  isAutorizado: boolean = true;
  user: User = {}
  tipoTela: number = 1;
  convenioForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'ativo', 'executante', 'acoes'];
  dataSource: MatTableDataSource<Convenio> = new MatTableDataSource<Convenio>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private convenioService: ConvenioService,
    private auth: JwtAuthService,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.isAutorizado = this.auth.ValidaRolesFuncionario('sa');
    this.ListaConvenio();
    this.InicializaForm();
  }

  ListaConvenio() {
    this.tipoTela = 1;
    this.user = this.auth.getUser();
    this.convenioService.ListarConveniosClinica(+this.user.idClinica)
      .subscribe((convenios) => {
        this.dataSource = new MatTableDataSource(convenios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  InicializaForm() {
    this.convenioForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [Validators.required]),
      registroAns: new UntypedFormControl('', []),
      ativo: new UntypedFormControl(false, []),
      nomeFantasia: new UntypedFormControl('', []),
      executante: new UntypedFormControl('', []),
      codOperadora: new UntypedFormControl('', []),
      versaoTiss: new UntypedFormControl('', []),
      proximoLote: new UntypedFormControl('', []),
      proximaGuia: new UntypedFormControl('', []),
      sadt: new UntypedFormControl(false, [])
    })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.convenioForm.reset();
  }

  //Metodos Auxiliares
  AplicaFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private dadosForm() {
    return this.convenioForm.controls;
  }
}
