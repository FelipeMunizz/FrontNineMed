import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
}