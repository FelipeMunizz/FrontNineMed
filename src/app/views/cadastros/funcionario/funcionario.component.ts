import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'app/shared/models/user.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EnumService } from 'app/shared/services/enum.service';
import { RegisterUser } from 'app/shared/models/register-user.model';
import { UserService } from 'app/shared/services/auth/user.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit, AfterViewInit {
  funcionarioForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'idClinica', 'nome', 'profissionalSaude', 'acoes'];
  dataSource: MatTableDataSource<Funcionario> = new MatTableDataSource<Funcionario>();
  user: User = {}
  isAutorizado: boolean = true;
  tipoTela: number
  hide: boolean = false;
  perfils: { value: number; label: string }[] = [];
  maskCNPJ: string = '00.000.000/0000-00';
  maskCPF: string = '000.000.000-00';

  funcionarioEdicao: Funcionario;
  idRegisterUser: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private funcionarioService: FuncionarioService,
    private auth: JwtAuthService,
    private utility: UtilityService,
    private enumService: EnumService,
    private userService: UserService,
    private modal: AppConfirmService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isAutorizado = this.auth.ValidaRolesFuncionario('sa');
    this.ListaFuncionarios();
    this.InicializaForm();
    this.perfils = this.enumService.getPerfilUsuario();
  }

  InicializaForm() {
    this.funcionarioForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new UntypedFormControl('', [
        Validators.required
      ]),
      nome: new UntypedFormControl('', [
        Validators.required
      ]),
      tipoDoc: new UntypedFormControl(0, []),
      documento: new UntypedFormControl('', [
        Validators.required
      ]),
      profissionalSaude: new UntypedFormControl(false, []),
      perfil: new UntypedFormControl(0, []),
      registroProfissional: new UntypedFormControl('', []),
      especialidade: new UntypedFormControl('', [])
    })
  }

  ListaFuncionarios() {
    this.tipoTela = 1;
    this.user = this.auth.getUser();
    this.funcionarioService.ListaFuncionario(+this.user.idClinica)
      .subscribe((funcionarios) => {
        this.dataSource = new MatTableDataSource(funcionarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.funcionarioForm.reset();
  }

  SalvarClick() {
    if (this.funcionarioForm.invalid) {
      this.utility.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }

    var dados = this.dadosForm();
    var funcionario = new Funcionario;
    var registerUser = new RegisterUser;
    this.user = this.auth.getUser();

    registerUser.email = dados['email'].value;
    registerUser.documento = dados['documento'].value;
    registerUser.password = dados['password'].value;

    funcionario.nome = dados['nome'].value;
    funcionario.email = dados['email'].value;
    funcionario.perfil = +dados['perfil'].value;
    funcionario.profissionalSaude = dados['profissionalSaude'].value ? dados['profissionalSaude'].value : false;
    funcionario.registroProfissional = dados['registroProfissional'].value;
    funcionario.especialidade = dados['especialidade'].value;
    funcionario.idClinica = +this.user.idClinica;
    if (this.funcionarioEdicao) {
      funcionario.id = this.funcionarioEdicao.id;
      this.userService.EditUser(this.idRegisterUser, registerUser)
        .subscribe(() => {
          this.funcionarioService.AtualizarFuncionario(funcionario)
            .subscribe((response) => {
              this.utility.MostraToastr('Sucesso', 'Funcionario atualizado com sucesso', 'sucesso');
              this.funcionarioForm.reset();
              this.ListaFuncionarios();
            },
              (error) => {
                this.utility.MostraToastr('Erro', 'Erro ao atualizar o funcionario', 'error');
              })
        },
          (error) => {
            this.utility.MostraToastr('Erro', 'Erro ao atualizar o usuario', 'error');
          })
    } else {
      if (!dados['password'].value) {
        this.utility.MostraToastr('Erro', 'Por favor, preencha a senha', 'erro');
        return;
      }

      this.userService.CreateUser(registerUser)
        .subscribe((response) => {
          this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
          this.funcionarioService.AdicionarFuncionario(funcionario)
            .subscribe((response) => {
              debugger
              this.utility.MostraToastr('Sucesso', response.message, 'sucesso');
              this.funcionarioForm.reset();
              this.ListaFuncionarios();
            },
              (error) => {
                this.utility.MostraToastr('Erro', 'Erro ao adicionar o funcionario', 'erro')
              })
        },
          (error) => {
            this.utility.MostraToastr('Erro', 'Erro ao adicionar o usuario', 'erro')
          })
    }
  }

  DeletarFuncionario(idFuncionario: number, email: string) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o funcionario?' })
      .subscribe((retorno) => {
        if (retorno) {
          var dados = this.dadosForm();
          this.userService.ObterUsaurio(email)
            .subscribe((usuario) => {
              this.userService.DeletarUsuario(usuario.id)
                .subscribe(() => {
                  this.funcionarioService.DeletarFuncionario(idFuncionario)
                    .subscribe(() => {
                      this.utility.MostraToastr('Sucesso', 'Funcionario deletado com sucesso', 'sucesso');
                      this.ListaFuncionarios();
                    },
                      () => {
                        this.utility.MostraToastr('Erro', 'Erro ao deletar funcionario', 'erro');
                      })
                },
                  () => {

                  })
            });
        }
      })

    this.ListaFuncionarios();
  }

  LoadDadosForm(id: number, email: string) {
    this.tipoTela = 2;

    var dados = this.dadosForm();
    this.userService.ObterUsaurio(email)
      .subscribe((usuario) => {
        this.idRegisterUser = usuario.id;
        if (usuario.documento.lengh > 11)
          dados['tipoDoc'].setValue(0);
        dados['documento'].setValue(usuario.documento);
        dados['email'].setValue(usuario.email);
      });

    this.funcionarioService.ObterFuncionario(id)
      .subscribe((func) => {
        this.funcionarioEdicao = func;
        dados['nome'].setValue(func.nome);
        dados['profissionalSaude'].setValue(func.profissionalSaude);
        dados['perfil'].setValue(func.perfil);
        dados['registroProfissional'].setValue(func.registroProfissional);
        dados['especialidade'].setValue(func.especialidade);
      })
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
    return this.funcionarioForm.controls;
  }
}
