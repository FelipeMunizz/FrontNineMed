export class CategoriaFinanceira{
    id: number;
    nome: string;
    tipo: number;
    idClinica: number;
}

export class SubCategoria   {
    id: number;
    nome: string;
    idCategoriaFinanceira: number;
}