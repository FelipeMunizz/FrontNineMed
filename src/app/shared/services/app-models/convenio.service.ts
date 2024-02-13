import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Convenio } from "app/shared/models/convenio.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ConvenioService {
    baseUrl = config.apiUrl + '/Convenio'
    constructor(
        private httpClient: HttpClient
    ) { }

    //Listar Convenios Clinica
    public ListarConveniosClinica(idClinica: number): Observable<any>{
        const url = `${this.baseUrl}/ListarConveniosClinica/${idClinica}`;
        return this.httpClient.get<any>(url);
    }

    //Obter Convenio
    public ObterConvenio(idConvenio: number): Observable<any>{
        const url = `${this.baseUrl}/ObterConvenio/${idConvenio}`;
        return this.httpClient.get<any>(url);
    }

    //Adicionar Convenio
    public AdicionarConvenio(convenio: Convenio): Observable<any>{
        const url = `${this.baseUrl}/AdicionarConvenio`;
        return this.httpClient.post<any>(url, convenio);
    }

    //Atualizar Convenio
    public AtualizarConvenio(convenio: Convenio): Observable<any>{
        const url = `${this.baseUrl}/AtualizarConvenio`;
        return this.httpClient.put<any>(url, convenio);
    }

    //Deletar Convenio
    public DeletarConvenio(idConvenio: number): Observable<any>{
        const url = `${this.baseUrl}/DeletarConvenio/${idConvenio}`;
        return this.httpClient.get<any>(url);
    }
}