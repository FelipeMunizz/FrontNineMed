import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AdicionarClinica, Clinica } from 'app/shared/models/clinica.model';

@Injectable({    
  providedIn: "root",
})
export class UtilityService{
    constructor(private httpClient: HttpClient){}

    public BuscaEndereco(cep: string){
        return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
    }

    public BuscaCnpj(cnpj: string){
      return this.httpClient.get<any>(`https://api.invertexto.com/v1/cnpj/${cnpj}?token=6166|6hBK4CYDjTvRrkcUROmZWRdxWqNSYn3A`)
    }
}