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
