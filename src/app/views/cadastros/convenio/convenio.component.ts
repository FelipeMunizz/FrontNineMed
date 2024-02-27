import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Convenio } from 'app/shared/models/convenio.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
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

  convenioEdicao: Convenio;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private convenioService: ConvenioService,
    private auth: JwtAuthService,
    private utility: UtilityService,
    private modal: AppConfirmService
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

  LoadDadosForm(idConvenio: number) {
    var dados = this.dadosForm();
    this.convenioService.ObterConvenio(idConvenio)
      .subscribe((convenio) => {
        this.convenioEdicao = convenio
        dados['nome'].setValue(convenio.nome);
        dados['registroAns'].setValue(convenio.registroAns);
        dados['ativo'].setValue(convenio.ativo);
        dados['nomeFantasia'].setValue(convenio.nomeFantasia);
        dados['executante'].setValue(convenio.executante);
        dados['codOperadora'].setValue(convenio.codOperadora);
        dados['versaoTiss'].setValue(convenio.versaoTISS);
        dados['proximoLote'].setValue(convenio.proximoLote);
        dados['proximaGuia'].setValue(convenio.proximaGuia);
        dados['sadt'].setValue(convenio.sadt);
      });
    this.tipoTela = 2;
  }

  SalvarClick() {
    if (this.convenioForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var convenio = new Convenio;
    this.user = this.auth.getUser();

    convenio.nome = dados['nome'].value;
    convenio.registroAns = dados['registroAns'].value;
    convenio.ativo = dados['ativo'].value ? dados['ativo'].value : false;
    convenio.nomeFantasia = dados['nomeFantasia'].value;
    convenio.executante = dados['executante'].value;
    convenio.codOperadora = dados['codOperadora'].value;
    convenio.versaoTISS = dados['versaoTiss'].value;
    convenio.proximoLote = dados['proximoLote'].value;
    convenio.proximaGuia = dados['proximaGuia'].value;
    convenio.sadt = dados['sadt'].value ? dados['sadt'].value : false;
    convenio.idClinica = +this.user.idClinica;

    if (this.convenioEdicao) {
      convenio.id = this.convenioEdicao.id
      this.convenioService.AtualizarConvenio(convenio)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Convênio atualizado com sucesso', 'sucesso')
          this.ListaConvenio();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o convênio', 'erro')
          })
    } else {
      this.convenioService.AdicionarConvenio(convenio)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Convênio adicionado com sucesso', 'sucesso')
          this.ListaConvenio();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao adicionar o convênio', 'erro')
          })
    }
  }

  DeletarConvenio(idConvenio: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o convênio?' })
      .subscribe((retorno) => {
        if (retorno) {
          var dados = this.dadosForm();
          this.convenioService.DeletarConvenio(idConvenio)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', 'Convênio deletado com sucesso', 'sucesso');
              this.ListaConvenio();
            },
              () => {
                this.utility.MostraToastr('Erro', 'Erro ao deletar o convênio', 'erro')
              })
        }
      })

    this.ListaConvenio();
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
