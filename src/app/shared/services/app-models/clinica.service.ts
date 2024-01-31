import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { AdicionarClinica, Clinica } from 'app/shared/models/clinica.model';

@Injectable({    
  providedIn: "root",
})

export class ClinicaService{
    constructor(private httpClient: HttpClient){}

    private readonly baseUrl = environment.apiURL;

    //Lista Clinicas do usuario
    public ListaClinicasUsuario(email: string): Observable<any> {
      const url = `${this.baseUrl}/Clinica/ListaClinicasUsuario?email=${email}`;
      return this.httpClient.get<any>(url);
    }

    //Adicionar Clinica
    public AdicionarClinica(clinica: AdicionarClinica): Observable<any>{
      const url = `${this.baseUrl}/Clinica/AdicionarClinica`;
      return this.httpClient.post<any>(url, clinica);
    }

    //Atualizar Clinica
    public AtualizarClinica(clinica: Clinica): Observable<any>{
      const url = `${this.baseUrl}/Clinica/AtualizarClinica`;
      return this.httpClient.put<any>(url, clinica);
    }

    //Deletar Clinica
    public DeletarClinica(id: number): Observable<any>{
      const url = `${this.baseUrl}/Clinica/DeletarClinica/${id}`;
      return this.httpClient.delete<any>(url)
    }
}