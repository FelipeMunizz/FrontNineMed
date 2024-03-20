export class Lancamento{
    Id: number;
    Tipo: number;
    Valor: number;
    Descricao: string;
    DataLancamento: Date;
    DataVencimento: Date;

    IdPaciente: number;
    IdFuncionario: number;
    IdConvenio: number;
    IdProcedimento: number;
    IdSubCategoria: number;
    IdContaBancaria: number;
    IdFormaPagamento: number;
    IdCentroCusto: number;
    IdClinica: number;
}