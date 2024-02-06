export class AdicionarClinica{
  cnpj: string;
  razaoSocial: string;
  fantasia: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  simplesNacional: boolean = false;
  logo: string;

  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  estado: number;
  cidade: string;
  codMunicipio: string;

  nomeContato: string;
  numeroContato: string;
  tipoContato: number;
  email: string;
  horarioComercial: boolean = false;
  lembretes: boolean = false;
}

export class Clinica {
  id: number;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  fantasia: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string; 
  simplesNacional: boolean;
  logo: string;
}

export class ContatoClinica {
  id: number;
  nome: string;
  numeroContato: string;
  email: string;
  tipoContato: number;
  horarioComercial: boolean;
  lembretes: boolean;
  idClinica: number;
}

export class EnderecoClinica{
  id: number
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  estado: number;
  cidade: string;
  codMunicipio: string;
  idClinica: number;
}