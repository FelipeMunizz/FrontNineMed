export class Agendamento {
    id: number;
    dataAgendamento: Date;
    repeticao: number;
    situacaoAgendamento: number;
    lembrete: boolean;
    observacao?: string;
    idsProcedimento: number[];
    idClinica: number;
    idPaciente: number;
    idFuncionario: number;
    idConvenio: number;
  }