import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoria } from 'app/shared/models/categoria-financeira.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { SubCategoriaFinanceiraService } from 'app/shared/services/app-models/sub-categoria.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-sub-categoria',
  templateUrl: './sub-categoria.component.html',
  styleUrls: ['./sub-categoria.component.scss']
})
export class SubCategoriaComponent implements OnInit {
  idCategoria: number;
  tipoTela: number = 1;
  subCategoriaForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'acoes'];
  dataSource: MatTableDataSource<SubCategoria> = new MatTableDataSource<SubCategoria>();

  subCategoriaEdicao: SubCategoria;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private utility: UtilityService,
    private modal: AppConfirmService,
    private subCategoriaService: SubCategoriaFinanceiraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => this.idCategoria = +param['idCategoria']);
    this.InicializaForm();
    this.ListarCategorias();
  }

  InicializaForm() {
    this.subCategoriaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [Validators.required])
    })
  }

  ListarCategorias() {
    this.tipoTela = 1;

    this.subCategoriaService.ListarSubCategoriaFinanceiras(this.idCategoria)
      .subscribe((categoria) => {
        this.dataSource = new MatTableDataSource(categoria);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.subCategoriaForm.reset();
  }

  LoadDadosForm(idCategoria: number) {
    var dados = this.dadosForm();
    this.subCategoriaService.ObterSubCategoria(idCategoria)
      .subscribe((categoria) => {
        this.subCategoriaEdicao = categoria;
        dados['nome'].setValue(categoria.nome);
      })

    this.tipoTela = 2
  }

  SalvarClick() {
    if (this.subCategoriaForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var categoria = new SubCategoria;

    categoria.nome = dados['nome'].value;
    categoria.idCategoriaFinanceira = this.idCategoria;

    if (this.subCategoriaEdicao) {
      categoria.id = this.subCategoriaEdicao.id;

      this.subCategoriaService.AtualizarSubCategoriaFinanceira(categoria)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', 'Categoria atualizado com sucesso', 'sucesso')
          this.ListarCategorias();
        },
          () => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o categoria', 'erro')
          })
    } else {
      this.subCategoriaService.AdicionarSubCategoria(categoria)
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
          this.subCategoriaService.DeletarSubCategoria(idCategoria)
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
  
  CategoriaNavigate(idCategoria: number){
    this.router.navigateByUrl(`financeiro/categoria-financeira`)
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
    return this.subCategoriaForm.controls;
  }
}
