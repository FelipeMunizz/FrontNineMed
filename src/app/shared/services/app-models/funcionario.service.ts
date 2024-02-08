import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Funcionario } from 'app/shared/models/funcionario.model';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({    
    providedIn: "root",
})

export class FuncionarioService{
    constructor(private httpClient: HttpClient){}

    private readonly baseUrl = environment.apiURL;

    //Lista Funcionario da Clinica
    public ListaFuncionario(idClinica: number): Observable<any> {
      const url = `${this.baseUrl}/Funcionario/ListarFuncionarios/${idClinica}`;
      return this.httpClient.get<any>(url);
    }

    public ObterFuncionario(idFuncionario: number): Observable<any> {
      const url = `${this.baseUrl}/Funcionario/ObterFuncionario/${idFuncionario}`;
      return this.httpClient.get<any>(url);
    }

    public ObterFuncionarioEmail(email: string): Observable<any> {
      const url = `${this.baseUrl}/Funcionario/ObterFuncionarioEmail?email=${email}`;
      return this.httpClient.get<any>(url);
    }

    //Adicionar Funcionario
    public AdicionarFuncionario(funcionario: Funcionario): Observable<any>{
      const url = `${this.baseUrl}/Funcionario/AdicionarFuncionario`;
      return this.httpClient.post<any>(url, funcionario);
    }

    //Atualizar Funcionario
    public AtualizarFuncionario(funcionario: Funcionario): Observable<any>{
      const url = `${this.baseUrl}/Funcionario/AtualizarFuncionario`;
      return this.httpClient.put<any>(url, funcionario);
    }

    //Atualizar Funcionario
    public AtualizarSenhaFuncionario(email: string, password: string): Observable<any>{
      const url = `${this.baseUrl}/Funcionario/AtualizarSenhaFuncionario`;
      return this.httpClient.put<any>(url, {email, password});
    }
}
  