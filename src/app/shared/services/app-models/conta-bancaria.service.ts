import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ContaBancaria } from "app/shared/models/conta-bancaria.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ContaBancariaService{    
    constructor(
        private httpClient: HttpClient
    ){}
    
    private readonly baseUrl = environment.apiURL + '/ContaBancaria';
    
     // Lista ContaBancarias
     public ListaContasBancariaBanco(idBanco: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaContasBancariaBanco/${idBanco}`)
    }

    // Obter ContaBancarias
    public ObterContaBancaria(idContaBancaria: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterContaBancaria/${idContaBancaria}`)
    }

    // Adicionar ContaBancarias
    public AdicionarContaBancaria(contaBancaria: ContaBancaria): Observable<any> {
        const url = `${this.baseUrl}/AdicionarContaBancaria`
        return this.httpClient.post<any>(url, contaBancaria);
    }

    // Atualizar ContaBancarias
    public AtualizarContaBancaria(contaBancaria: ContaBancaria): Observable<any> {
        const url = `${this.baseUrl}/AtualizarContaBancaria`
        return this.httpClient.put<any>(url, contaBancaria);
    }

    // Deletar ContaBancarias
    public DeletarContaBancaria(idContaBancaria: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarContaBancaria/${idContaBancaria}`)
    }
}