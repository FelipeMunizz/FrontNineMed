import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Procedimento } from "app/shared/models/procedimento.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProcedimentoService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = config.apiUrl + '/Procedimento';

    //Lista Procedimentos
    public ListaProcedimentoClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaProcedimentoClinica/${idClinica}`)
    }

    //Obter Procedimento
    public ObterProcedimento(idProcedimento: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterProcedimento/${idProcedimento}`)
    }

    //Adicionar Procedimento
    public AdicionarProcedimento(procedimento: Procedimento): Observable<any> {
        const url = `${this.baseUrl}/AdicionarProcedimento`
        return this.httpClient.post<any>(url, procedimento);
    }

    //Atualizar Procedimento
    public AtualizarProcedimento(Procedimento: Procedimento): Observable<any> {
        const url = `${this.baseUrl}/EditarProcedimento`
        return this.httpClient.put<any>(url, Procedimento);
    }

    //Deletar Procedimento
    public DeletarProcedimento(idProcedimento: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/DeletarProcedimento/${idProcedimento}`)
    }
}