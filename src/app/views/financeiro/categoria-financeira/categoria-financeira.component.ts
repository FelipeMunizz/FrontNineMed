import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaFinanceira } from 'app/shared/models/categoria-financeira.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { CategoriaFinanceiraService } from 'app/shared/services/app-models/categoria-financeira.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-categoria-financeira',
  templateUrl: './categoria-financeira.component.html',
  styleUrls: ['./categoria-financeira.component.scss']
})
export class CategoriaFinanceiraComponent implements OnInit {
  user: User = {}
  tipoTela: number = 1;
  categoriaForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'tipo', 'acoes'];
  dataSource: MatTableDataSource<CategoriaFinanceira> = new MatTableDataSource<CategoriaFinanceira>();
  tipos: { value: number; label: string }[] = [];

  categoriaEdicao: CategoriaFinanceira;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private categoriaService: CategoriaFinanceiraService,
    private utility: UtilityService,
    private router: Router,
    private authService: JwtAuthService,
    private modal: AppConfirmService,
    private enumService: EnumService
  ) { }

  ngOnInit(): void {
    this.InicializaForm();
    this.ListarCategorias();
    this.tipos = this.enumService.getTipoLancamento();
  }

  InicializaForm() {
    this.categoriaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [Validators.required]),
      tipo: new UntypedFormControl('', [Validators.required])
    })
  }

  ListarCategorias() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.categoriaService.ListarCategoriasFinanceiraClinica(+this.user.idClinica)
      .subscribe((categoria) => {
        this.dataSource = new MatTableDataSource(categoria);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.categoriaForm.reset();
  }

  LoadDadosForm(idCategoria: number) {
    var dados = this.dadosForm();
    this.categoriaService.ObterCategoriaFinanceira(idCategoria)
      .subscribe((categoria) => {
        this.categoriaEdicao = categoria;
        dados['nome'].setValue(categoria.nome);
        dados['tipo'].setValue(categoria.tipo);
      })

    this.tipoTela = 2
  }

  SalvarClick() {
    if (this.categoriaForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var categoria = new CategoriaFinanceira;
    this.user = this.authService.getUser();

    categoria.nome = dados['nome'].value;
    categoria.tipo = dados['tipo'].value;
    categoria.idClinica = +this.user.idClinica;

    if (this.categoriaEdicao) {
      categoria.id = this.categoriaEdicao.id;

      this.categoriaService.AtualizarCategoriaFinanceira(categoria)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Categoria atualizado com sucesso', 'sucesso')
          this.ListarCategorias();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o categoria', 'erro')
          })
    } else {
      this.categoriaService.AdicionarCategoriaFinanceira(categoria)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso')
          this.ListarCategorias();
        },
          (response) => {
            debugger
            this.utility.MostraToastr('Erro', response.message, 'erro')
          })
    }
  }

  DeletarCategoria(idCategoria: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar a categoria?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.categoriaService.DeletarCategoriaFinanceira(idCategoria)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
              this.ListarCategorias();
            },
              (response) => {
                this.utility.MostraToastr('Erro', response.message, 'erro')
              })
        }
      })

    this.ListarCategorias();
  }

  SubCategoriaNavigate(idCategoria: number){
    this.router.navigateByUrl(`financeiro/sub-categoria?idCategoria=${idCategoria}`)
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
    return this.categoriaForm.controls;
  }

  getTextEnum(id: number) {
    let tipoLancamento = this.tipos.find(item => item.value === id)
    if (tipoLancamento)
      return tipoLancamento.label;
  }
}
