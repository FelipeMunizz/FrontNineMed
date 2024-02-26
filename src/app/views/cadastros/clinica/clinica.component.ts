import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ClinicaService } from 'app/shared/services/app-models/clinica.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { User } from './../../../shared/models/user.model';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Clinica, AdicionarClinica, EnderecoClinica, ContatoClinica } from 'app/shared/models/clinica.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EnumService } from 'app/shared/services/enum.service';
import { MatDialog } from '@angular/material/dialog';
import { EnderecoClinicaModalComponent } from './modals/endereco-clinica.modal.component';
import { ClinicaModalComponent } from './modals/clinica.modal.component';
import { ContatoClinicaModalComponent } from './modals/contato-clinica.modal.component';
import { matxAnimations } from 'app/shared/animations/matx-animations';
import { ConfiguracaoClinicaService } from 'app/shared/services/app-models/configuracao-clinica.service';
import { ConfiguracaoClinica } from 'app/shared/models/configuracao-clinica.model';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.scss'],
  animations: matxAnimations
})

export class ClinicaComponent implements OnInit {
  tipoTela: number = 1
  formData = {};
  user: User = {};
  funcionarioAuth: Funcionario;
  logoBase64: string | undefined;
  clinicaForm: UntypedFormGroup;
  estados: { value: number; label: string }[] = [];
  listaClinicas: Array<Clinica>;
  listaEnderecoClinica: Array<EnderecoClinica>;
  listaContatoClinica: Array<ContatoClinica>;
  isAccordionOpen: boolean[] = [];
  isCollapsed: boolean[] = [];
  isCollapsedContato: boolean[] = [];
  isAutorizado: boolean;

  constructor(
    private clinicaService: ClinicaService,
    private funcionarioService: FuncionarioService,
    private auth: JwtAuthService,
    private utilityService: UtilityService,
    private enumService: EnumService,
    private modal: AppConfirmService,
    private loader: AppLoaderService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private configClinicaService: ConfiguracaoClinicaService
  ) { }

  ngOnInit() {
    this.isAutorizado = this.auth.ValidaRolesFuncionario('sa');
    this.ListaClinicas();
    this.IniciaForm();
    this.estados = this.enumService.getEstados();
  };

  IniciaForm() {

    this.clinicaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(150)
      ]),
      cnpj: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(14)
      ]),
      inscricaoMunicipal: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(11)
      ]),
      inscricaoEstadual: new UntypedFormControl('', [
        Validators.maxLength(9)
      ]),
      fantasia: new UntypedFormControl('', []),
      cep: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(11)
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
        Validators.email,
        Validators.required
      ]),
      horarioComercial: new UntypedFormControl(false, []),
      lembretes: new UntypedFormControl(true, []),
      simplesNacional: new UntypedFormControl(false, []),
    })
  }

  ListaClinicas() {
    this.loader.open('Aguarde');
    this.tipoTela = 1;
    this.user = this.auth.getUser();
    this.clinicaService.ListaClinicasUsuario(this.user.displayName).subscribe(
      (clinicas) => {
        this.listaClinicas = clinicas;
        this.listaClinicas.forEach(clinica => {
          this.clinicaService.ListarEnderecoClinica(clinica.id)
            .subscribe((endereco) => {
              this.listaEnderecoClinica = endereco;
            });
          this.clinicaService.ListaContatoClinica(clinica.id)
            .subscribe((contato) => {
              this.listaContatoClinica = contato;
            })
        });
      },
      (error) => {
        this.utilityService.MostraToastr("Erro", error.message, 'erro')
      }
    )
    this.loader.close();
  }

  Salvar() {
    if (this.clinicaForm.invalid) {
      this.utilityService.MostraToastr('Erro', 'Por favor, preencha todos os campos corretamente', 'erro');
      return;
    }
    
    this.loader.open('Aguarde');
    var dados = this.dadosForm()
    var item = new AdicionarClinica();
    item.cnpj = dados['cnpj'].value
    item.razaoSocial = dados['nome'].value
    item.fantasia = dados['fantasia'].value
    item.inscricaoEstadual = dados['inscricaoEstadual'].value ? dados['inscricaoEstadual'].value : ''
    item.inscricaoMunicipal = dados['inscricaoMunicipal'].value
    item.simplesNacional = dados['simplesNacional'].value
    item.logo = this.logoBase64 ? this.logoBase64 : ''

    item.logradouro = dados['logradouro'].value;
    item.numero = dados['numero'].value;
    item.complemento = dados['complemento'].value;
    item.bairro = dados['bairro'].value;
    item.cep = dados['cep'].value;
    item.estado = dados['uf'].value;
    item.cidade = dados['cidade'].value;

    item.nomeContato = dados['nomeContato'].value;
    item.numeroContato = dados['numeroContato'].value;
    item.tipoContato = dados['tipoContato'].value;
    item.email = dados['email'].value;
    item.horarioComercial = dados['horarioComercial'].value ? dados['horarioComercial'].value : false;
    item.lembretes = dados['lembretes'].value ? dados['lembretes'].value : false;

    this.clinicaService.AdicionarClinica(item)
      .subscribe((response: any) => {
        this.clinicaForm.reset();
        this.utilityService.MostraToastr('Adicionado com Sucesso', response.message, 'sucesso');
        this.user = this.auth.getUser();

        let funcionario = new Funcionario();
        funcionario.email = this.user.displayName;
        funcionario.idClinica = response.result.id;
        funcionario.profissionalSaude = true;
        funcionario.perfil = 0;

        this.funcionarioService.AdicionarFuncionario(funcionario)
          .subscribe((responseFuncionario: any) => {
            this.utilityService.MostraToastr('Adicionado com Sucesso', responseFuncionario.message, 'sucesso');
          },
            (errorFun) => {
              this.utilityService.MostraToastr('Erro', errorFun.message, 'erro')
            }
          )
          
          let configClinica = new ConfiguracaoClinica();
          configClinica.idClinica = response.result.id;
          configClinica.horarioAbertura = '08:00:00';
          configClinica.horarioFechamento = '18:00:00';
          configClinica.funcionaFeriados = false;
          configClinica.controlaEstoque = true;
          this.configClinicaService.AdicionarConfiguracaoClinica(configClinica)
          .subscribe((resp) => {
            this.utilityService.MostraToastr('Adicionado com Sucesso', 'Configuração da Clinica adicionada com dados padrão, favor alter.', 'sucesso');
          });
          
        this.ListaClinicas();
      },
        (error) => {
          this.utilityService.MostraToastr('Erro ao Adicionar Clinica', error.message, 'erro')
        })
    this.loader.close();
  }

  DeletarClinica(id: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar a clinica?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.clinicaService.DeletarClinica(id)
            .subscribe((response: any) => {
              this.utilityService.MostraToastr('', response.message, 'aviso')
            })
        }
      })
  }

  DeletarEnderecoClinica(id: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o endereço?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.clinicaService.DeletarEnderecoClinica(id)
            .subscribe((response: any) => {
              this.ListaClinicas();
              this.utilityService.MostraToastr('', response.message, 'aviso')
            })
        }
      })
  }

  DeletarContatoClinica(id: number) {
    this.modal.confirm({ title: 'Confirme', message: 'Tem certeza que deseja deletar o contato?' })
      .subscribe((retorno) => {
        if (retorno) {
          this.clinicaService.DeletarContatoClinica(id)
            .subscribe((response: any) => {
              this.ListaClinicas();
              this.utilityService.MostraToastr('', response.message, 'aviso')
            })
        }
      })
  }

  TelaCadastro() {
    this.tipoTela = 2;
    this.clinicaForm.reset();
  }

  openEnderecoModal(idClinica?: number, endereco?: EnderecoClinica) {
    const dialogRef = this.dialog.open(EnderecoClinicaModalComponent, {
      width: '80vh',
      height: 'auto',
      data: { idClinica, endereco }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.ListaClinicas();
    });
  }

  openContatoModal(idClinica?: number, contato?: ContatoClinica) {
    const dialogRef = this.dialog.open(ContatoClinicaModalComponent, {
      width: '80vh',
      height: 'auto',
      data: { idClinica, contato }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.ListaClinicas();
    });
  }

  openClinicaModal(clinica?: Clinica) {
    if (clinica) {
      const dialogRef = this.dialog.open(ClinicaModalComponent, {
        width: '100vh',
        height: 'auto',
        data: { clinica }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.ListaClinicas();
      });
    }
  }

  //Metodos Auxiliares   

  toggleAccordion(index: number) {
    this.isAccordionOpen[index] = !this.isAccordionOpen[index];
    const collapse = this.el.nativeElement.querySelector(`#accordion-item-${index}`);
    this.isAccordionOpen[index] ? this.renderer.addClass(collapse, 'show') : this.renderer.removeClass(collapse, 'show');
  }

  toggleCollapse(index: number, tipo: string) {
    if (tipo === 'endedreco')
      this.isCollapsed[index] = !this.isCollapsed[index];
    else if (tipo === 'contato') {
      this.isCollapsedContato[index] = !this.isCollapsedContato[index];
    }
  }

  SanitizeImage(base64String: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`${base64String}`);
  }

  SetValorEnum(id: number, enumPesquisa: string) {
    switch (enumPesquisa) {
      case 'uf':
        let ufs = this.enumService.getEstados();
        let uf = ufs.find(item => item.value === id)
        if (uf)
          return uf.label;
        break;
      case 'contato':
        let tipoContato = this.enumService.getTipoContato();
        let contato = tipoContato.find(item => item.value === id);
        if (contato)
          return contato.label;

    }
  }

  onKeyPress(event: any): void {
    const keyCode = event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
      event.preventDefault();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      if (this.isImageFile(file)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.logoBase64 = reader.result as string;
        };

        reader.readAsDataURL(file);
      } else {
        this.utilityService.MostraToastr('Atenção', 'Por favor, selecione um arquivo de imagem válido.', 'aviso');
      }
    }
  }

  private isImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const fileType = file.type;

    return allowedTypes.includes(fileType);
  }

  dadosForm() {
    return this.clinicaForm.controls
  }

  BuscaEndereco(cep: string) {
    this.utilityService.BuscaEndereco(cep).subscribe(
      (endereco) => {
        this.clinicaForm.get('logradouro')?.setValue(endereco.logradouro);
        this.clinicaForm.get('bairro')?.setValue(endereco.bairro);
        this.clinicaForm.get('cidade')?.setValue(endereco.localidade);
        const estadoRetornado = this.estados.find((estado) => estado.label === endereco.uf);
        if (estadoRetornado)
          this.clinicaForm.get('uf')?.setValue(estadoRetornado.value);

      },
      (error) => {
        this.clinicaForm.get('logradouro')?.setValue('');
        this.clinicaForm.get('bairro')?.setValue('');
        this.clinicaForm.get('cidade')?.setValue('');
        this.clinicaForm.get('uf')?.setValue(null);
        this.utilityService.MostraToastr('Erro ao buscar endereço', error.message, 'erro');
      }
    )
  };

  BuscaCnpj(cnpj: string) {
    this.utilityService.BuscaCnpj(cnpj).subscribe(
      (cadastro) => {
        this.clinicaForm.get('nome')?.setValue(cadastro.razao_social);
        this.clinicaForm.get('fantasia')?.setValue(cadastro.nome_fantasia);
        if (cadastro.simples.optante_simples === 'S')
          this.clinicaForm.get('simplesNacional')?.setValue(true);
        else
          this.clinicaForm.get('simplesNacional')?.setValue(false);

        this.clinicaForm.get('logradouro')?.setValue(cadastro.endereco.logradouro);
        this.clinicaForm.get('bairro')?.setValue(cadastro.endereco.bairro);
        this.clinicaForm.get('cidade')?.setValue(cadastro.endereco.municipio);
        this.clinicaForm.get('cep')?.setValue(cadastro.endereco.cep);
        this.clinicaForm.get('complemento')?.setValue(cadastro.endereco.complemento);
        this.clinicaForm.get('numero')?.setValue(cadastro.endereco.numero);
        const estadoRetornado = this.estados.find((estado) => estado.label === cadastro.endereco.uf);
        if (estadoRetornado)
          this.clinicaForm.get('uf')?.setValue(estadoRetornado.value);

        this.clinicaForm.get('email')?.setValue(cadastro.email);
        this.clinicaForm.get('numeroContato')?.setValue(cadastro.telefone1);
        this.clinicaForm.get('nomeContato')?.setValue(cadastro.nome_fantasia);
        this.clinicaForm.get('tipoContato')?.setValue(1);
        this.clinicaForm.get('horarioComercial')?.setValue(true);
      }
    )
  }
}
