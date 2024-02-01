import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({    
  providedIn: "root",
})
export class UtilityService{
    constructor(private httpClient: HttpClient, private toastr: ToastrService){}

    public BuscaEndereco(cep: string){
        return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
    }

    public BuscaCnpj(cnpj: string){
      return this.httpClient.get<any>(`https://api.invertexto.com/v1/cnpj/${cnpj}?token=6166|6hBK4CYDjTvRrkcUROmZWRdxWqNSYn3A`)
    }

    public MostraToastr(title: string, message: string, tipoMensagem){
      switch(tipoMensagem){
        case 'sucesso':
          this.toastr.success(message, title);
          break;
        case 'aviso':
          this.toastr.warning(message, title);
          break;
        case 'erro':
          this.toastr.error(message, title);
          break;
      }
    }
}