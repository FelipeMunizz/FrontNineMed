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
