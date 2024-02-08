import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfiguracaoClinica } from "app/shared/models/configuracao-clinica.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ConfiguracaoClinicaService {
    constructor(private httpClient: HttpClient) { }

    private readonly baseUrl = environment.apiURL + '/ConfiguracaoClinica';

    //Obter Config
    public ObterConfiguracaoClinica(idConfiguracaoClinica: number) {
        const url = `${this.baseUrl}/ObterConfiguracaoClinica/${idConfiguracaoClinica}`
        return this.httpClient.get<any>(url);
    }

    //Obter Config - IdClinica
    public ObterConfiguracaoIdClinica(idClinica: number) {
        const url = `${this.baseUrl}/ObterConfiguracaoIdClinica/${idClinica}`
        return this.httpClient.get<any>(url);
    }

    //Adicionar Configuracao Clinica
    public AdicionarConfiguracaoClinica(configuracaoClincia: ConfiguracaoClinica): Observable<any> {
        const url = `${this.baseUrl}/AdicionarConfiguracaoClinica`;
        return this.httpClient.post<any>(url, configuracaoClincia);
    }

    //Atualizar Configuracao Clinica
    public AtualizarConfiguracaoClinica(configuracaoClincia: ConfiguracaoClinica): Observable<any> {
        const url = `${this.baseUrl}/AtualizarConfiguracaoClinica`;
        return this.httpClient.put<any>(url, configuracaoClincia);
    }
}