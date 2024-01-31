export class Clinica {
    public id: number;
    public nome: string;
    public cnpj: string;
    public fantasia: string;
    public inscricaoEstadual: string;
    public inscricaoMunicipal: string; 
    public simplesNacional: boolean;
    public logo: string;
}

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

  nomeContato: string;
  numeroContato: string;
  tipoContato: number;
  email: string;
  horarioComercial: boolean = false;
  lembretes: boolean = false;
}