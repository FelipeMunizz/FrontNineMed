import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Lancamento } from "app/shared/models/lancamento.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LancamentoService{
    constructor(private httpClient: HttpClient) { }

    baseUrl = config.apiUrl + '/Lancamento';

    public RetornoSaldoGeral(idContaBancaria: number): Observable<any>{
        var url = `${this.baseUrl}/RetornoSaldoGeral/${idContaBancaria}`;
        return this.httpClient.get<any>(url);
    }

    // Lista Lancamentos
    public ListaLancamentoReceitas(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaLancamentoReceitas/${idClinica}`)
    }

    // Lista Lancamentos
    public ListaLancamentoDespesas(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaLancamentoDespesas/${idClinica}`)
    }

    // Obter Lancamentos
    public ObterLancamento(idLancamento: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterLancamento/${idLancamento}`)
    }

    // Adicionar Lancamentos
    public AdicionarLancamento(lancamento: Lancamento): Observable<any> {
        const url = `${this.baseUrl}/AdicionarLancamento`
        return this.httpClient.post<any>(url, lancamento);
    }

    // Atualizar Lancamentos
    public AtualizarLancamento(lancamento: Lancamento): Observable<any> {
        const url = `${this.baseUrl}/AtualizarLancamento`
        return this.httpClient.put<any>(url, lancamento);
    }
}