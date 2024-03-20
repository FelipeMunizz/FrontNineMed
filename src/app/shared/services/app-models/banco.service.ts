import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Banco } from "app/shared/models/banco.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BancoService{
    constructor(
       private httpClient: HttpClient
    ){}

    baseUrl = config.apiUrl + '/Banco';

    // Lista Bancos
    public ListarBancosClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListarBancosClinica/${idClinica}`)
    }

    // Obter Bancos
    public ObterBanco(idBanco: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterBanco/${idBanco}`)
    }

    // Adicionar Bancos
    public AdicionarBanco(banco: Banco): Observable<any> {
        const url = `${this.baseUrl}/AdicionarBanco`
        return this.httpClient.post<any>(url, banco);
    }

    // Atualizar Bancos
    public AtualizarBanco(banco: Banco): Observable<any> {
        const url = `${this.baseUrl}/AtualizarBanco`
        return this.httpClient.put<any>(url, banco);
    }

    // Deletar Bancos
    public DeletarBanco(idBanco: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarBanco/${idBanco}`)
    }
}