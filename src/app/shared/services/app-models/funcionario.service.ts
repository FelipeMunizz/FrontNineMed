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

    //Adicionar Funcionario
    public AdicionarFuncionario(funcionario: Funcionario): Observable<any>{
      const url = `${this.baseUrl}/Funcionario/AdicionarFuncionario`;
      return this.httpClient.post<any>(url, funcionario);
    }

}
  