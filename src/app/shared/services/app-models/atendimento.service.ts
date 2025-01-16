import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Atendimento, AtestadoAtendimento } from "app/shared/models/atendimento.model";
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

  public EvolucaoProntuarioByIdPaciente(idPaciente: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/EvolucaoProntuarioByIdPaciente/${idPaciente}`)
  }

    //Adicionar Atestado
    public AdicionarAtestado(atestado: AtestadoAtendimento): Observable<any> {
      const url = `${this.baseUrl}/AdicionarAtestadoAtendimento`;
      return this.httpClient.post<any>(url, atestado);
    }
  
    //Atualizar Atendimento
    public AtualizarAtestado(atestado: AtestadoAtendimento): Observable<any> {
      const url = `${this.baseUrl}/AtualizarAtestadoAtendimento`;
      return this.httpClient.put<any>(url, atestado);
    }
  
    //Deletar Atendimento
    public DeletarAtestado(id: number): Observable<any> {
      const url = `${this.baseUrl}/DeletarAtestadoAtendimento/${id}`;
      return this.httpClient.delete<any>(url)
    }

    public ObterAtestadoByIdAtendimento(idAtendimento: number): Observable<any> {
      return this.httpClient.get<any>(`${this.baseUrl}/ObterAtestadoByIdAtendimento/${idAtendimento}`)
    }

    public ObterAtestadoRelatorio(idAtendimento: number): Observable<any> {
      return this.httpClient.get<any>(`${this.baseUrl}/ObterAtestadoRelatorio/${idAtendimento}`)
    }
}