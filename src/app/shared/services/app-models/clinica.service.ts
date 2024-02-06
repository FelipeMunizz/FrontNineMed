import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { AdicionarClinica, Clinica, ContatoClinica, EnderecoClinica } from 'app/shared/models/clinica.model';

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

    //Obtem Clinica 
    public ObterClinica(idClinica: number){
      const url = `${this.baseUrl}/Clinica/ObterClinica/${idClinica}`;
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

    //Listar Endereco Clinica
    public ListarEnderecoClinica(idClinica: number){
      const url = `${this.baseUrl}/Clinica/ListaEnderecosClinica/${idClinica}`;
      return this.httpClient.get<any>(url);
    }

    //Atualizar Endereco Clinica
    public AtualizarEnderecoClinica(item: EnderecoClinica){
      const url = `${this.baseUrl}/Clinica/AtualizarEnderecoClinica`;
      return this.httpClient.put<any>(url, item);
    }

    public DeletarEnderecoClinica(idEndereco: number): Observable<any>{
      const url = `${this.baseUrl}/Clinica/DeletarEnderecoClinica/${idEndereco}`;
      return this.httpClient.delete<any>(url)
    }

    //Listar Contatos Clinica
    public ListaContatoClinica(idClinica: number){
      const url = `${this.baseUrl}/Clinica/ListaContatoClinica/${idClinica}`;
      return this.httpClient.get<any>(url);
    }

    //Atualizar Contato Clinica
    public AtualizarContatoClinica(item: ContatoClinica){
      const url = `${this.baseUrl}/Clinica/AtualizarContatoClinica`;
      return this.httpClient.put<any>(url, item);
    }

    public DeletarContatoClinica(idEndereco: number): Observable<any>{
      const url = `${this.baseUrl}/Clinica/DeletarContatoClinica/${idEndereco}`;
      return this.httpClient.delete<any>(url)
    }
}