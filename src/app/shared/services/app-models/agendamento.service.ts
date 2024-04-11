import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Agendamento } from "app/shared/models/agendamento.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AgendamentoService{
    constructor(
        private httpClient: HttpClient
    ){}

    private readonly baseUrl = environment.apiURL + '/Agendamento';

    // Lista Agendamentos
    public ListarAgendamentosClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaAgendamentosClinica/${idClinica}`)
    }

    public ListarAgendamentosPaciente(idPaciente: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaAgendamentoPaciente/${idPaciente}`)
    }

    public ListarAgendamentosDia(idClinica: number, dia: Date): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaAgendamentosDia/${idClinica}/${dia}`)
    }

    public ListarAgendamentosFuncionario(idFuncionario: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaAgendamentosFuncionario/${idFuncionario}`)
    }

    // Obter Agendamentos
    public ObterAgendamento(idAgendamento: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterAgendamento/${idAgendamento}`)
    }

    // Adicionar Agendamentos
    public AdicionarAgendamento(agendamento: Agendamento): Observable<any> {
        const url = `${this.baseUrl}/AdicionarAgendamento`
        return this.httpClient.post<any>(url, agendamento);
    }

    public ConfirmarAgendamento(idAgendamento: number): Observable<any>{
        const url = `${this.baseUrl}/ConfirmarAgendamento/${idAgendamento}`;
        return this.httpClient.put<any>(url, null)
    }

    // Atualizar Agendamentos
    public AtualizarAgendamento(agendamento: Agendamento): Observable<any> {
        const url = `${this.baseUrl}/AtualizarAgendamento`
        return this.httpClient.put<any>(url, agendamento);
    }

    // Deletar Agendamentos
    public DeletarAgendamento(idAgendamento: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletarAgendamento/${idAgendamento}`)
    }
}