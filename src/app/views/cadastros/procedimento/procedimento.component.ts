import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Procedimento } from 'app/shared/models/procedimento.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { ProcedimentoService } from 'app/shared/services/app-models/procedimento.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.scss']
})
export class ProcedimentoComponent implements OnInit {
  isAutorizado: boolean = true;
  user: User = {}
  tipoTela: number = 1;
  procedimentoForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'preco', 'duracao', 'acoes'];
  dataSource: MatTableDataSource<Procedimento> = new MatTableDataSource<Procedimento>();

  procedimentoEdicao: Procedimento;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private procedimentoService: ProcedimentoService,
    private authService: JwtAuthService,
    private utility: UtilityService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.ListaProcedimento();
    this.InicializaForm();
  }

  InicializaForm() {
    this.procedimentoForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [Validators.required]),
      preco: new UntypedFormControl('', []),
      duracao: new UntypedFormControl('', []),
      codTribMunicipio: new UntypedFormControl('', [])
    })
  }

  ListaProcedimento() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.procedimentoService.ListaProcedimentoClinica(+this.user.idClinica)
      .subscribe((procedimentos) => {
        this.dataSource = new MatTableDataSource(procedimentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.procedimentoForm.reset();
  }

  SalvarClick(){
    if (this.procedimentoForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var procedimento = new Procedimento;
    this.user = this.authService.getUser();

    procedimento.nome = dados['nome'].value;
    procedimento.preco = dados['preco'].value;
    procedimento.duracao = dados['duracao'].value;
    procedimento.codTribMunicipio = dados['codTribMunicipio'].value;
    procedimento.idClinica = +this.user.idClinica;

    if(this.procedimentoEdicao){
      procedimento.id = this.procedimentoEdicao.id;

      this.procedimentoService.AtualizarProcedimento(procedimento)
      .subscribe((response) => {
        this.utility.MostraToastr('Sucesso', 'Procedimento atualizado com sucesso', 'sucesso')
          this.ListaProcedimento();
      },
      () => {
        this.utility.MostraToastr('Erro', 'Erro ao atualizar o procedimento', 'erro')
      })
    }else{
      this.procedimentoService.AdicionarProcedimento(procedimento)
      .subscribe((response) => {
        this.utility.MostraToastr('Sucesso', 'Procedimento adicionado com sucesso', 'sucesso')
          this.ListaProcedimento();
      },
      () => {
        this.utility.MostraToastr('Erro', 'Erro ao adicionar o procedimento', 'erro')
      })
    }
  }

  LoadDadosForm(idProcedimento: number){
    var dados = this.dadosForm();
    this.procedimentoService.ObterProcedimento(idProcedimento)
    .subscribe((procedimento) => {
      this.procedimentoEdicao = procedimento;
      dados['nome'].setValue(procedimento.nome);
      dados['preco'].setValue(procedimento.preco);
      dados['duracao'].setValue(procedimento.duracao);
      dados['codTribMunicipio'].setValue(procedimento.codTribMunicipio);
    })

    this.tipoTela = 2
  }

  DeletarProcedimento(idProcedimento: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o Procedimento?' })
      .subscribe((retorno) => {
        if (retorno) {
          var dados = this.dadosForm();
          this.procedimentoService.DeletarProcedimento(idProcedimento)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', 'Procedimento deletado com sucesso', 'sucesso');
              this.ListaProcedimento();
            },
              () => {
                this.utility.MostraToastr('Erro', 'Erro ao deletar o Procedimento', 'erro')
              })
        }
      })

    this.ListaProcedimento();
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
    return this.procedimentoForm.controls;
  }

}
