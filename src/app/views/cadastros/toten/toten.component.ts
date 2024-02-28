import { Token } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Toten } from 'app/shared/models/toten.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-toten',
  templateUrl: './toten.component.html',
  styleUrls: ['./toten.component.scss']
})
export class TotenComponent implements OnInit {
  user: User = {}
  tipoTela: number = 1;
  totenForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'idClinica', 'acoes'];
  dataSource: MatTableDataSource<Toten> = new MatTableDataSource<Toten>();

  totenEdicao: Toten;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private totenService: TotenService,
    private authService: JwtAuthService,
    private utility: UtilityService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.ListaToten();
    this.IniciaForm();
  }

  ListaToten() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.totenService.ListaTotensClinica(+this.user.idClinica)
      .subscribe((totens) => {
        this.dataSource = new MatTableDataSource(totens);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  IniciaForm() {
    this.totenForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', Validators.required)
    })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.totenForm.reset();
  }

  SalvarClick() {
    if (this.totenForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var toten = new Toten;
    this.user = this.authService.getUser();

    toten.nome = dados['nome'].value;
    toten.idClinica = +this.user.idClinica;

    if (this.totenEdicao) {
      toten.id = this.totenEdicao.id;

      this.totenService.AtualizarToten(toten)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Toten atualizado com sucesso', 'sucesso')
          this.ListaToten();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o toten', 'erro')
          })
    } else {
      this.totenService.AdicionarToten(toten)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Toten adicionado com sucesso', 'sucesso')
          this.ListaToten();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao adicionar o toten', 'erro')
          })
    }
  }



  LoadDadosForm(idToten: number) {
    var dados = this.dadosForm();
    this.totenService.ObterToten(idToten)
      .subscribe((toten) => {
        this.totenEdicao = toten;
        dados['nome'].setValue(toten.nome);
      })

    this.tipoTela = 2
  }

  DeletarToten(idToten: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o toten?' })
      .subscribe((retorno) => {
        if (retorno) {
          var dados = this.dadosForm();
          this.totenService.DeletarToten(idToten)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', 'Procedimento deletado com sucesso', 'sucesso');
              this.ListaToten();
            },
              () => {
                this.utility.MostraToastr('Erro', 'Erro ao deletar o Procedimento', 'erro')
              })
        }
      })

    this.ListaToten();
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
    return this.totenForm.controls;
  }

}
