import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Atendimento } from "app/shared/models/atendimento.model";
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

  public GraficoAtendimentosMensal(idAtendimento: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/GraficoAtendimentosMensal/${idAtendimento}`)
  }

  //Adicionar Atendimento
  public AdicionarAtendimento(atendimento: Atendimento): Observable<any> {
    const url = `${this.baseUrl}/AdicionarAtendimento`;
    return this.httpClient.post<any>(url, atendimento);
  }

  //Atualizar Atendimento
  public AtualizarAtendimento(atendimento: Atendimento): Observable<any> {
    const url = `${this.baseUrl}/AtualizarAtendimento`;
    return this.httpClient.put<any>(url, atendimento);
  }

  //Deletar Atendimento
  public DeletarAtendimento(id: number): Observable<any> {
    const url = `${this.baseUrl}/DeletarAtendimento/${id}`;
    return this.httpClient.delete<any>(url)
  }

  // Obter Atendimentos
  public ObterAtendimento(idAtendimento: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/ObterAtendimento/${idAtendimento}`)
  }
}