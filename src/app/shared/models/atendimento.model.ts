export class Atendimento {
    id: number;
    queixaPrincipal?: string;
    historiaMolestiaAtual?: string;
    historicoAntecedentes?: string;
    exameFisico?: string;
    iMC?: number;
    diagnostico?: string;
    conduta?: string;
    finalizado: boolean;
    idAgendamento: number;
}

export class AtendimentoPaciente {
    nome: string;
    dataNascimento: string;
    convenio: string;
    habitos: string;
    alergia: string;
    primeiraConsulta: string;   
    antecedenteClinico: string;
    antecedenteCirurgico: string;
    antecedenteFamiliares: string;
    medicamentoUso: string;
}

export class AtestadoAtendimento{
    id: number;
    tipoAtestado: number = 0;
    data: Date = new Date();
    descricao: string;
    idAtendimento: number;
}

export class AtestadoReport{
    nomePaciente: string;
    nomeEmpresa: string;
    nomeFuncionario: string;
    dataInicial: string;
    dataFinal: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    crm: string;
    descricao: string;
    telefone: string;
    dataEmissao: string;
    logoEmpresa: string;
}