import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubCategoria } from "app/shared/models/categoria-financeira.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SubCategoriaFinanceiraService{
    constructor(
        private httpClient: HttpClient
    ){} 
        
    private readonly baseUrl = environment.apiURL + '/SubCategoria';

     // Lista SubCategoriaFinanceiras
    public ListarSubCategoriaFinanceiras(idCategoriaFinanceira: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListarSubCategoriaFinanceiras/${idCategoriaFinanceira}`)
    }

    public ListaSubCategoriaTipo(idClinica: number, tipo: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaSubCategoriaTipo/${idClinica}?tipo=${tipo}`)
    }

    // Obter SubCategoriaFinanceiras
    public ObterSubCategoria(idSubCategoriaFinanceira: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterSubCategoria/${idSubCategoriaFinanceira}`)
    }

    // Adicionar SubCategoriaFinanceiras
    public AdicionarSubCategoria(subCategoriaFinanceira: SubCategoria): Observable<any> {
        const url = `${this.baseUrl}/AdicionarSubCategoria`
        return this.httpClient.post<any>(url, subCategoriaFinanceira);
    }

    // Atualizar SubCategoriaFinanceiras
    public AtualizarSubCategoriaFinanceira(subCategoriaFinanceira: SubCategoria): Observable<any> {
        const url = `${this.baseUrl}/AtualizarSubCategoria`
        return this.httpClient.put<any>(url, subCategoriaFinanceira);
    }

    // Deletar SubCategoriaFinanceiras
    public DeletarSubCategoria(idSubCategoriaFinanceira: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarSubCategoria/${idSubCategoriaFinanceira}`)
    }
}