import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { User } from 'app/shared/models/user.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: User = {}
  funcionarioForm: UntypedFormGroup;
  loginForm: UntypedFormGroup;
  hide = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private auth: JwtAuthService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.InicializaForm();
    this.LoadDadosForm();
  }

  InicializaForm() {
    this.loginForm = new UntypedFormGroup({
      password: new UntypedFormControl('', [])
    });

    this.funcionarioForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [
        Validators.email,
        Validators.required
      ]),
      profissionalSaude: new UntypedFormControl(false, []),
      registroProfissional: new UntypedFormControl('', []),
      especialidade: new UntypedFormControl('', [])
    })
  }

  LoadDadosForm() {
    this.user = this.auth.getUser();
    this.funcionarioService.ObterFuncionario(parseInt(this.user.idFuncionario))
      .subscribe((funcionario) => {
        var dados = this.dadosForm(this.funcionarioForm);
        dados['nome'].setValue(funcionario.nome);
        dados['email'].setValue(funcionario.email);
        dados['profissionalSaude'].setValue(funcionario.profissionalSaude);
        dados['registroProfissional'].setValue(funcionario.registroProfissional);
        dados['especialidade'].setValue(funcionario.especialidade);
      })
  }

  AtualizarSenhaFuncionario() {
    this.user = new User;
    this.user = this.auth.getUser();
    var dados = this.dadosForm(this.loginForm)
    debugger
    if (dados['password'].value) {
      this.funcionarioService.AtualizarSenhaFuncionario(this.user.displayName, dados['password'].value)
        .subscribe((response) => {
          this.utilityService.MostraToastr('Sucesso', response.message, 'sucesso');
        },
          (error) => {
            this.utilityService.MostraToastr('Erro', error.messagee, 'erro');
          })
    }
  }

  AtualizarFuncionario() {
    this.user = new User;
    this.user = this.auth.getUser();

    if(!this.user.idClinica && !this.user.idFuncionario){
      this.utilityService.MostraToastr('Aviso', 'Funcionario não cadastrado a nenhuma clinica, entre em contato com o suporte', 'aviso');
      return
    }

    var funcionario = new Funcionario;
    var dados = this.dadosForm(this.funcionarioForm);
    funcionario.nome = dados['nome'].value;
    funcionario.email = dados['email'].value;
    funcionario.profissionalSaude = dados['profissionalSaude'].value;
    funcionario.registroProfissional = dados['registroProfissional'].value;
    funcionario.especialidade = dados['especialidade'].value;
    funcionario.id = +this.user.idFuncionario;
    funcionario.idClinica = +this.user.idClinica;

    this.funcionarioService.AtualizarFuncionario(funcionario)
    .subscribe((response) => {
      this.utilityService.MostraToastr('Sucesso', 'Funcionario atualizado com sucesso', 'sucesso');
      this.LoadDadosForm();
    },
    (error) => {
      this.utilityService.MostraToastr('Erro', 'Erro ao atualizar o funcionario', 'erro');
    })
  }

  //Metodos Auxiliares
  private dadosForm(form: UntypedFormGroup) {
    return form.controls;
  }
}
