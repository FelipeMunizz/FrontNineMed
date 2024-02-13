import { parse } from "date-fns";

export class AdicionarPaciente {
    idClinica: number;
    nome: string;
    dataNascimento: Date;
    estadoCivil: number;
    rg: string;
    cpf: string;
    profissao: string;

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

    numeroCarterinha: string;
    validade: Date;
    contratoPlano: string;
    observacoes: string;
    idConvenio: number;

    nomeFamiliar: string;
    grauParentesco: string;
    telefoneFamiliar: string;
}

export class Paciente {
    id: number;
    idClinica: number;
    nome: string;
    dataNascimento: string;
    estadoCivil: number;
    rg: string;
    cpf: string;
    profissao: string;
}

export class ContatoPaciente {
    id: number;
    nome: string;
    numeroContato: string;
    email: string;
    tipoContato: number;
    horarioComercial: boolean;
    lembretes: boolean;
    idClinica: number;
}

export class EnderecoPaciente {
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

export class ConvenioPaciente {
    id: number;
    numeroCarterinha: string;
    validade: string;
    contratoPlano: string;
    observacoes: string;
    idConvenio: number;
}

export class FamiliarPaciente {
    id: number;
    nomeFamiliar: string;
    grauParentesco: string;
    telefoneFamiliar: string;
}

export class ProntuarioPaciente {
    id: number;
    antecedenteClinico: string;
    antecedenteCirurgico: string;
    antecedenteFamiliares: string;
    habitos: string;
    alergias: string;
    medicamentoUso: string;
    idPaciente: number;
}