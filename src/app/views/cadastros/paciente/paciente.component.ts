import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Convenio } from 'app/shared/models/convenio.model';
import { AdicionarPaciente, Paciente } from 'app/shared/models/paciente.model';
import { SelectedModel } from 'app/shared/models/selected-model';
import { User } from 'app/shared/models/user.model';
import { ConvenioService } from 'app/shared/services/app-models/convenio.service';
import { PacienteService } from 'app/shared/services/app-models/paciente.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { EnumService } from 'app/shared/services/enum.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  user: User = {}
  pacienteForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'rg', 'cpf', 'acoes'];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource<Paciente>();
  tipoTela: number = 1;
  estadosCivil: { value: number, label: string }[] = [];
  estados: { value: number, label: string }[] = [];

  listaConvenios: Array<SelectedModel>;
  convenioSelected: SelectedModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: JwtAuthService,
    private pacienteService: PacienteService,
    private utitlity: UtilityService,
    private enumService: EnumService,
    private convenioService: ConvenioService
  ) { }

  ngOnInit(): void {
    this.estados = this.enumService.getEstados();
    this.estadosCivil = this.enumService.getEstadoCivil();
    this.LoadForm();
    this.ListaPaciente();
    this.ListaConvenios();
  }

  LoadForm() {
    this.pacienteForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [
        Validators.required
      ]),
      dataNascimento: new UntypedFormControl('', [
        Validators.required
      ]),
      estadoCivil: new UntypedFormControl('', [
        Validators.required
      ]),
      rg: new UntypedFormControl('', [
        Validators.required
      ]),
      cpf: new UntypedFormControl('', [
        Validators.required
      ]),
      profissao: new UntypedFormControl('', [
        Validators.required
      ]),
      cep: new UntypedFormControl('', [
        Validators.required
      ]),
      logradouro: new UntypedFormControl('', [
        Validators.required
      ]),
      complemento: new UntypedFormControl('', [
      ]),
      numero: new UntypedFormControl('', [
        Validators.required
      ]),
      bairro: new UntypedFormControl('', [
        Validators.required
      ]),
      cidade: new UntypedFormControl('', [
        Validators.required
      ]),
      uf: new UntypedFormControl(null, [
        Validators.required
      ]),
      nomeContato: new UntypedFormControl('', [
        Validators.required
      ]),
      numeroContato: new UntypedFormControl('', [
        Validators.required
      ]),
      tipoContato: new UntypedFormControl(0, [
        Validators.required
      ]),
      email: new UntypedFormControl('', [
        Validators.email
      ]),
      horarioComercial: new UntypedFormControl(false, []),
      lembretes: new UntypedFormControl(true, []),
      numeroCarteirinha: new UntypedFormControl('', []),
      validade: new UntypedFormControl('', []),
      contratoPlano: new UntypedFormControl('', []),
      observacoes: new UntypedFormControl('', []),
      idConvenio: new UntypedFormControl('', []),
      nomeFamiliar: new UntypedFormControl('', []),
      grauParentesco: new UntypedFormControl('', []),
      telefoneFamiliar: new UntypedFormControl('', [])
    })
  }

  ListaPaciente() {
    this.tipoTela = 1;
    this.user = this.authService.getUser();

    this.pacienteService.ListaPacientesClinica(+this.user.idClinica)
      .subscribe((pacientes) => {
        this.dataSource = new MatTableDataSource(pacientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.pacienteForm.reset;
  }

  SalvarClick() {
    if (this.pacienteForm.invalid) {
      this.utitlity.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }
    this.user = this.authService.getUser();
    var paciente = new AdicionarPaciente();
    var dados = this.dadosForm();

    paciente.idClinica = +this.user.idClinica;

    paciente.nome = dados['nome'].value;
    paciente.dataNascimento = dados['dataNascimento'].value;
    paciente.estadoCivil = dados['estadoCivil'].value;
    paciente.rg = dados['rg'].value;
    paciente.cpf = dados['cpf'].value;

    paciente.logradouro = dados['logradouro'].value;
    paciente.numero = dados['numero'].value;
    paciente.complemento = dados['complemento'].value;
    paciente.bairro = dados['bairro'].value;
    paciente.cep = dados['cep'].value;
    paciente.estado = dados['uf'].value;
    paciente.cidade = dados['cidade'].value;

    paciente.nomeContato = dados['nomeContato'].value;
    paciente.numeroContato = dados['numeroContato'].value;
    paciente.tipoContato = +dados['tipoContato'].value;
    paciente.email = dados['email'].value;
    paciente.horarioComercial = dados['horarioComercial'].value ? dados['horarioComercial'].value : false;
    paciente.lembretes = dados['lembretes'].value ? dados['lembretes'].value : false;

    paciente.numeroCarterinha = dados['numeroCarteirinha'].value;
    paciente.validade = dados['validade'].value ? new Date(dados['validade'].value) : new Date('1111-01-01');
    paciente.contratoPlano = dados['contratoPlano'].value;
    paciente.observacoes = dados['observacoes'].value;
    paciente.idConvenio = dados['idConvenio'].value;
    paciente.nomeFamiliar = dados['nomeFamiliar'].value;
    paciente.grauParentesco = dados['grauParentesco'].value;
    paciente.telefoneFamiliar = dados['telefoneFamiliar'].value;

    this.pacienteService.AdicionarPaciente(paciente)
    .subscribe((response) => {
      this.utitlity.MostraToastr('Sucesso', 'Paciente adicionado com sucesso', 'sucesso');
      this.ListaPaciente();
    },
    (error) => {
      this.utitlity.MostraToastr('Error', 'Erro ao adicionar o paciente', 'erro')
    })
  }

  ListaConvenios() {
    this.user = this.authService.getUser();

    this.convenioService.ListarConveniosClinica(+this.user.idClinica)
      .subscribe((convenios: Array<Convenio>) => {
        var listConvenios = [];
        convenios.forEach(x => {
          var item = new SelectedModel();
          item.id = x.id;
          item.name = x.nome;

          listConvenios.push(item);
        });

        this.listaConvenios = listConvenios;
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
    return this.pacienteForm.controls;
  }

  BuscaEndereco(cep: string) {
    this.utitlity.BuscaEndereco(cep).subscribe(
      (endereco) => {
        this.pacienteForm.get('logradouro')?.setValue(endereco.logradouro);
        this.pacienteForm.get('bairro')?.setValue(endereco.bairro);
        this.pacienteForm.get('cidade')?.setValue(endereco.localidade);
        const estadoRetornado = this.estados.find((estado) => estado.label === endereco.uf);
        if (estadoRetornado)
          this.pacienteForm.get('uf')?.setValue(estadoRetornado.value);

      },
      (error) => {
        this.pacienteForm.get('logradouro')?.setValue('');
        this.pacienteForm.get('bairro')?.setValue('');
        this.pacienteForm.get('cidade')?.setValue('');
        this.pacienteForm.get('uf')?.setValue(null);
        this.utitlity.MostraToastr('Erro ao buscar endereço', error.message, 'erro');
      }
    )
  };
}
