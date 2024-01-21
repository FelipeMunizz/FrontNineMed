import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({    
  providedIn: "root",
})
export class ClinicaService{
    constructor(private httpClient: HttpClient){}

    private readonly baseUrl = environment.apiURL;

    public ListaClinicasUsuario(email:string){
        return this.httpClient.get(`${this.baseUrl}/Clinica/ListaClinicasUsuario?email=${email}`)
    }
}