import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriaFinanceira } from "app/shared/models/categoria-financeira.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoriaFinanceiraService{
    constructor(
        private httpClient: HttpClient
    ){} 
        
    private readonly baseUrl = environment.apiURL + '/CategoriaFinanceira';

     // Lista CategoriaFinanceiras
     public ListarCategoriasFinanceiraClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListarCategoriasFinanceiraClinica/${idClinica}`)
    }

    // Obter CategoriaFinanceiras
    public ObterCategoriaFinanceira(idCategoriaFinanceira: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterCategoriaFinanceira/${idCategoriaFinanceira}`)
    }

    // Adicionar CategoriaFinanceiras
    public AdicionarCategoriaFinanceira(categoriaFinanceira: CategoriaFinanceira): Observable<any> {
        const url = `${this.baseUrl}/AdicionarCategoriaFinanceira`
        return this.httpClient.post<any>(url, categoriaFinanceira);
    }

    // Atualizar CategoriaFinanceiras
    public AtualizarCategoriaFinanceira(categoriaFinanceira: CategoriaFinanceira): Observable<any> {
        const url = `${this.baseUrl}/AtualizarCategoriaFinanceira`
        return this.httpClient.put<any>(url, categoriaFinanceira);
    }

    // Deletar CategoriaFinanceiras
    public DeletarCategoriaFinanceira(idCategoriaFinanceira: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarCategoriaFinanceira/${idCategoriaFinanceira}`)
    }
}