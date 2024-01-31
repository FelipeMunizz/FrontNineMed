import {  Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClinicaService } from 'app/shared/services/app-models/clinica.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { User } from './../../../shared/models/user.model';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Clinica, AdicionarClinica } from 'app/shared/models/clinica.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EstadosService } from 'app/shared/services/uf.service';
import { error } from 'console';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.scss']
})
export class ClinicaComponent implements OnInit {
  tipoTela : number = 1
  formData = {};
  user: User = {};
  logoBase64: string | undefined;
  console = console;
  clinicaForm: UntypedFormGroup;
  dataSource: MatTableDataSource<Clinica>;
  displayedColumns: string[] = ['id', 'razaoSocial', 'cnpj', 'simplesNacional', 'acoes'];
  estados: { value: number; label: string }[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private snac: MatSnackBar,
    private clinicaService: ClinicaService,
    private auth: JwtAuthService,
    private utilityService: UtilityService,
    private ufService: EstadosService
    ) { }

  ngOnInit() {
    this.ListaClinicas();
    this.clinicaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [        
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      cnpj: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(14)
      ]),
      inscricaoMunicipal: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(11)
      ]),
      inscricaoEstadual: new UntypedFormControl('',[
        Validators.maxLength(9)
      ]),
      fantasia: new UntypedFormControl('',[]),
      cep: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(11)
      ]),
      logradouro: new UntypedFormControl('',[
        Validators.required
      ]),
      complemento: new UntypedFormControl('',[
      ]),
      numero: new UntypedFormControl('',[
        Validators.required
      ]),
      bairro: new UntypedFormControl('',[
        Validators.required
      ]),
      cidade: new UntypedFormControl('',[
        Validators.required
      ]),
      uf: new UntypedFormControl(null,[
        Validators.required
      ]),
      nomeContato: new UntypedFormControl('',[
        Validators.required
      ]),
      numeroContato: new UntypedFormControl('',[
        Validators.required
      ]),
      tipoContato: new UntypedFormControl(null,[
        Validators.required
      ]),
      email: new UntypedFormControl('',[
        Validators.email,
        Validators.required
      ]),
      horarioComercial: new UntypedFormControl(false,[]),
      lembretes: new UntypedFormControl(true,[]),
      simplesNacional: new UntypedFormControl(false,[]),
    })
    this.estados = this.ufService.getEstados();
  };

  ListaClinicas(){
    this.tipoTela = 1;
    this.user = this.auth.getUser();
    this.clinicaService.ListaClinicasUsuario(this.user.displayName).subscribe(
      (clinicas) => {
        this.dataSource = new MatTableDataSource(clinicas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  Cadastro(){
    this.tipoTela = 2;
    this.clinicaForm.reset();
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
        this.snac.open('Por favor, selecione um arquivo de imagem válido.','',{duration: 3000});
      }
    }
  }

  private isImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const fileType = file.type;

    return allowedTypes.includes(fileType);
  }  

  dadosForm(){
    return this.clinicaForm.controls
  }

  submit(){
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
      .subscribe((response : any) => {
        this.clinicaForm.reset();
        this.ListaClinicas();
      })
}

  BuscaEndereco(cep: string){
    this.utilityService.BuscaEndereco(cep).subscribe(
      (endereco) => {
        this.clinicaForm.get('logradouro')?.setValue(endereco.logradouro);
        this.clinicaForm.get('bairro')?.setValue(endereco.bairro);
        this.clinicaForm.get('cidade')?.setValue(endereco.localidade);
        const estadoRetornado = this.estados.find((estado) => estado.label === endereco.uf);
        if(estadoRetornado)
          this.clinicaForm.get('uf')?.setValue(estadoRetornado.value);

      },
      (error) => {
        this.clinicaForm.get('logradouro')?.setValue('');
        this.clinicaForm.get('bairro')?.setValue('');
        this.clinicaForm.get('cidade')?.setValue('');
        this.clinicaForm.get('uf')?.setValue(null);
      }
    )
  };

  BuscaCnpj(cnpj: string){
    this.utilityService.BuscaCnpj(cnpj).subscribe(
      (cadastro) => {
        this.clinicaForm.get('nome')?.setValue(cadastro.razao_social);
        this.clinicaForm.get('fantasia')?.setValue(cadastro.nome_fantasia);  
        if(cadastro.simples.optante_simples === 'S')
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
        if(estadoRetornado)
          this.clinicaForm.get('uf')?.setValue(estadoRetornado.value);   

        this.clinicaForm.get('email')?.setValue(cadastro.email);
        this.clinicaForm.get('numeroContato')?.setValue(cadastro.telefone1);
        this.clinicaForm.get('nomeContato')?.setValue(cadastro.nome_fantasia); 
        this.clinicaForm.get('tipoContato')?.setValue('1'); 
        this.clinicaForm.get('horarioComercial')?.setValue(true);
      },
      (error) => {
        this.clinicaForm.reset();
      }
    )
  }
}
