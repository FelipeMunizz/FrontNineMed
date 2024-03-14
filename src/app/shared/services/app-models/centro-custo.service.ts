import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CentroCusto } from "app/shared/models/centro-custo";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CentroCustoService{
    constructor(
        private httpClient: HttpClient
    ){}
    
    baseUrl = config.apiUrl + '/CentroCusto';

    // Lista CentroCustos
    public ListarCentroCustosClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListarCentroCustoClinica/${idClinica}`)
    }

    // Obter CentroCustos
    public ObterCentroCusto(idCentroCusto: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterCentroCusto/${idCentroCusto}`)
    }

    // Adicionar CentroCustos
    public AdicionarCentroCusto(centroCusto: CentroCusto): Observable<any> {
        const url = `${this.baseUrl}/AdicionarCentroCusto`
        return this.httpClient.post<any>(url, centroCusto);
    }

    // Atualizar CentroCustos
    public AtualizarCentroCusto(centroCusto: CentroCusto): Observable<any> {
        const url = `${this.baseUrl}/AtualizarCentroCusto`
        return this.httpClient.put<any>(url, centroCusto);
    }

    // Deletar CentroCustos
    public DeletarCentroCusto(idCentroCusto: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarCentroCusto/${idCentroCusto}`)
    }
}