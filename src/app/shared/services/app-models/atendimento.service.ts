import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AtendimentoService {
    constructor(
        private httpClient: HttpClient
    ) { }

    private readonly baseUrl = environment.apiURL + '/Atendimento';

    public GraficoAtendimentosMensal(idClinica: number): Observable<any>{
        return this.httpClient.get<any>(`${this.baseUrl}/GraficoAtendimentosMensal/${idClinica}`)
    }
}