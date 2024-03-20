import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfiguracaoFinanceira } from "app/shared/models/configuracao-financeira.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ConfiguracaoFinanceiraService{
    constructor(
        private httpClient: HttpClient
     ){}
 
     baseUrl = config.apiUrl + '/ConfiguracaoFinanceira';
 
     // Lista ConfiguracaoFinanceiras
     public ListarConfiguracaoFinanceirasClinica(idClinica: number): Observable<any> {
         return this.httpClient.get<any>(`${this.baseUrl}/ListarConfiguracaoFinanceiraClinica/${idClinica}`)
     }
 
     // Obter ConfiguracaoFinanceiras
     public ObterConfiguracaoFinanceira(idConfiguracaoFinanceira: number): Observable<any> {
         return this.httpClient.get<any>(`${this.baseUrl}/ObterConfiguracaoFinanceira/${idConfiguracaoFinanceira}`)
     }
 
     // Adicionar ConfiguracaoFinanceiras
     public AdicionarConfiguracaoFinanceira(configuracaoFinanceira: ConfiguracaoFinanceira): Observable<any> {
         const url = `${this.baseUrl}/AdicionarConfiguracaoFinanceira`
         return this.httpClient.post<any>(url, configuracaoFinanceira);
     }
 
     // Atualizar ConfiguracaoFinanceiras
     public AtualizarConfiguracaoFinanceira(configuracaoFinanceira: ConfiguracaoFinanceira): Observable<any> {
         const url = `${this.baseUrl}/AtualizarConfiguracaoFinanceira`
         return this.httpClient.put<any>(url, configuracaoFinanceira);
     }
 
     // Deletar ConfiguracaoFinanceiras
     public DeletarConfiguracaoFinanceira(idConfiguracaoFinanceira: number): Observable<any> {
         return this.httpClient.delete<any>(`${this.baseUrl}/DeletarConfiguracaoFinanceira/${idConfiguracaoFinanceira}`)
     }
}