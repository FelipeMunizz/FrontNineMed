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
    anteClinicos: string;
    anteCirurgicos: string;
    anteFamiliares: string;
    habitos: string;
    alergia: string;
    medcUso: string;
    primeiraConsulta: string;   
    antecedenteClinico: string;
    antecedenteCirurgico: string;
    antecedenteFamiliares: string;
}
