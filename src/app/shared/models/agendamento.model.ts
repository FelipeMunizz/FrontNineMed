import { Time } from "@angular/common";

export class Agendamento {
    id: number;
    dataAgendamento: Date;
    horaAgendamento: string;
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