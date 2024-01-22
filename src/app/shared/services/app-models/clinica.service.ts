import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({    
  providedIn: "root",
})
export class ClinicaService{
    constructor(private httpClient: HttpClient){}

    private readonly baseUrl = environment.apiURL;

    public ListaClinicasUsuario(email: string): Observable<any> {
      const url = `${this.baseUrl}/Clinica/ListaClinicasUsuario?email=${email}`;
      // Pode ser necessário ajustar o tipo de retorno com base na resposta da sua API
      return this.httpClient.get<any>(url);
    }
}