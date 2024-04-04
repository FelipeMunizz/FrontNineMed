import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SenhaToten, Toten } from "app/shared/models/toten.model";
import { config } from "config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TotenService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = config.apiUrl + '/Toten';

    // Lista Totens
    public ListaTotensClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaTotensClinica/${idClinica}`)
    }

    // Obter Totens
    public ObterToten(idToten: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterToten/${idToten}`)
    }

    //Lista Senhas Tipo Atendimento
    public ListaSenhaTotenTipoAtendimento(tipoAtendimento: number, idToten: number): Observable<any>{
        return this.httpClient.get<any>(`${this.baseUrl}/ListaSenhaTotenTipoAtendimento/${tipoAtendimento}/${idToten}`);
    }

    // Obter Senha
    public ObterSenhaToten(idSenha: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterSenhaToten/${idSenha}`)
    }

    // Adicionar Totens
    public AdicionarToten(toten: Toten): Observable<any> {
        const url = `${this.baseUrl}/AdicionarToten`
        return this.httpClient.post<any>(url, toten);
    }

    // Atualizar Totens
    public AtualizarToten(toten: Toten): Observable<any> {
        const url = `${this.baseUrl}/AtualizarToten`
        return this.httpClient.put<any>(url, toten);
    }

    // Deletar Totens
    public DeletarToten(idToten: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarToten/${idToten}`)
    }

    // Adicionar SenhaToten
    public AdicionarSenhaToten(senhaToten: SenhaToten): Observable<any> {
        const url = `${this.baseUrl}/AdicionarSenhaToten`
        return this.httpClient.post<any>(url, senhaToten);
    }

    // Atualizar SenhaToten
    public AtualizarSenhaToten(senhaToten: SenhaToten): Observable<any> {
        const url = `${this.baseUrl}/AtualizarSenhaToten`
        return this.httpClient.put<any>(url, senhaToten);
    }

    // Deletar SenhasTotenDiarias
    public DeletarSenhasTotenDiarias(idToten: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarSenhasTotenDiarias/${idToten}`)
    }
}
