import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormaPagamento } from "app/shared/models/forma-pagamento.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FormaPagamentoService{
    
    constructor(
        private httpClient: HttpClient
    ){}

    baseUrl = config.apiUrl + '/FormaPagamento';

    // Lista FormaPagamentos
    public ListarFormaPagamentosClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListarFormaPagamentoClinica/${idClinica}`)
    }

    // Obter FormaPagamentos
    public ObterFormaPagamento(idFormaPagamento: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterFormaPagamento/${idFormaPagamento}`)
    }

    // Adicionar FormaPagamentos
    public AdicionarFormaPagamento(formaPagamento: FormaPagamento): Observable<any> {
        const url = `${this.baseUrl}/AdicionarFormaPagamento`
        return this.httpClient.post<any>(url, formaPagamento);
    }

    // Atualizar FormaPagamentos
    public AtualizarFormaPagamento(formaPagamento: FormaPagamento): Observable<any> {
        const url = `${this.baseUrl}/AtualizarFormaPagamento`
        return this.httpClient.put<any>(url, formaPagamento);
    }

    // Deletar FormaPagamentos
    public DeletarFormaPagamento(idFormaPagamento: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarFormaPagamento/${idFormaPagamento}`)
    }
}