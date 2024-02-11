import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { config } from "config";
import { AdicionarPaciente, ContatoPaciente, ConvenioPaciente, EnderecoPaciente, FamiliarPaciente, Paciente } from './../../models/paciente.model';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PacienteService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = config.apiUrl + '/Paciente';

    //Pacientes

    //Lista Pacientes
    public ListaPacientesClinica(idClinica: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ListaPacientesClinica/${idClinica}`)
    }

    //Obter Paciente
    public ObterPaciente(idPaciente: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/ObterPaciente/${idPaciente}`)
    }

    //Adicionar Paciente
    public AdicionarPaciente(adicionarPaciente: AdicionarPaciente): Observable<any> {
        const url = `${this.baseUrl}/AdicionarPaciente`
        return this.httpClient.post<any>(url, adicionarPaciente);
    }

    //Atualizar Paciente
    public AtualizarPaciente(paciente: Paciente): Observable<any> {
        const url = `${this.baseUrl}/AtualizarPaciente`
        return this.httpClient.put<any>(url, paciente);
    }

    //Deletar Paciente
    public DeletarPaciente(idPaciente: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/DeletarPaciente/${idPaciente}`)
    }

    //Endereco

    //Listar Endereco Paciente
    public ListarEnderecoPaciente(idPaciente: number): Observable<any> {
        const url = `${this.baseUrl}/ListaEnderecosPaciente /${idPaciente}`;
        return this.httpClient.get<any>(url);
    }

    //Adicionar Endereco Paciente
    public AdicionarEnderecoPaciente(item: EnderecoPaciente): Observable<any> {
        const url = `${this.baseUrl}/AdicionarEnderecoPaciente`;
        return this.httpClient.post<any>(url, item);
    }

    //Atualizar Endereco Paciente
    public AtualizarEnderecoPaciente(item: EnderecoPaciente): Observable<any> {
        const url = `${this.baseUrl}/AtualizarEnderecoPaciente`;
        return this.httpClient.put<any>(url, item);
    }

    public DeletarEnderecoPaciente(idEndereco: number): Observable<any> {
        const url = `${this.baseUrl}/DeletarEnderecoPaciente/${idEndereco}`;
        return this.httpClient.delete<any>(url)
    }    

    //Contato

    //Listar Contatos Paciente
    public ListaContatoPaciente(idPaciente: number): Observable<any> {
        const url = `${this.baseUrl}/ListaContatoPaciente /${idPaciente}`;
        return this.httpClient.get<any>(url);
    }

    //Adicionar Contato Paciente
    public AdicionarContatoPaciente(item: ContatoPaciente): Observable<any> {
        const url = `${this.baseUrl}/AdicionarContatoPaciente`;
        return this.httpClient.post<any>(url, item);
    }

    //Atualizar Contato Paciente
    public AtualizarContatoPaciente(item: ContatoPaciente): Observable<any> {
        const url = `${this.baseUrl}/AtualizarContatoPaciente`;
        return this.httpClient.put<any>(url, item);
    }

    //Deletar Contato Paciente
    public DeletarContatoPaciente(idEndereco: number): Observable<any> {
        const url = `${this.baseUrl}/DeletarContatoPaciente /${idEndereco}`;
        return this.httpClient.delete<any>(url)
    }

    //Convenio

    //Listar Convenio Paciente
    public ListaConvenioPaciente(idPaciente: number): Observable<any> {
        const url = `${this.baseUrl}/ListaConvenioPaciente /${idPaciente}`;
        return this.httpClient.get<any>(url);
    }

    //Adicionar Convenio Paciente
    public AdicionarConvenioPaciente(item: ConvenioPaciente): Observable<any> {
        const url = `${this.baseUrl}/AdicionarConvenioPaciente`;
        return this.httpClient.post<any>(url, item);
    }

    //Atualizar Convenio Paciente
    public AtualizarConvenioPaciente(item: ConvenioPaciente): Observable<any> {
        const url = `${this.baseUrl}/AtualizarConvenioPaciente`;
        return this.httpClient.put<any>(url, item);
    }

    //Deletar Convenio Paciente
    public DeletarConvenioPaciente(idEndereco: number): Observable<any> {
        const url = `${this.baseUrl}/DeletarConvenioPaciente /${idEndereco}`;
        return this.httpClient.delete<any>(url)
    }

    //Familiar

    //Listar Familiar Paciente
    public ListaFamiliarPaciente(idPaciente: number): Observable<any> {
        const url = `${this.baseUrl}/ListaFamiliarPaciente /${idPaciente}`;
        return this.httpClient.get<any>(url);
    }

    //Adicionar Familiar Paciente
    public AdicionarFamiliarPaciente(item: FamiliarPaciente): Observable<any> {
        const url = `${this.baseUrl}/AdicionarFamiliarPaciente`;
        return this.httpClient.post<any>(url, item);
    }

    //Atualizar Familiar Paciente
    public AtualizarFamiliarPaciente(item: FamiliarPaciente): Observable<any> {
        const url = `${this.baseUrl}/AtualizarFamiliarPaciente`;
        return this.httpClient.put<any>(url, item);
    }

    //Deletar Familiar Paciente
    public DeletarFamiliarPaciente(idEndereco: number): Observable<any> {
        const url = `${this.baseUrl}/DeletarFamiliarPaciente /${idEndereco}`;
        return this.httpClient.delete<any>(url)
    }
}