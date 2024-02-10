import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  getEstados() {
    return [
      { value: 0, label: 'AC' },
      { value: 1, label: 'AL' },
      { value: 2, label: 'AP' },
      { value: 3, label: 'AM' },
      { value: 4, label: 'BA' },
      { value: 5, label: 'CE' },
      { value: 6, label: 'DF' },
      { value: 7, label: 'ES' },
      { value: 8, label: 'GO' },
      { value: 9, label: 'MA' },
      { value: 10, label: 'MG' },
      { value: 11, label: 'MS' },
      { value: 12, label: 'MT' },
      { value: 13, label: 'PA' },
      { value: 14, label: 'PB' },
      { value: 15, label: 'PE' },
      { value: 16, label: 'PI' },
      { value: 17, label: 'PR' },
      { value: 18, label: 'RJ' },
      { value: 19, label: 'RN' },
      { value: 20, label: 'RO' },
      { value: 21, label: 'RR' },
      { value: 22, label: 'RS' },
      { value: 23, label: 'SC' },
      { value: 24, label: 'SE' },
      { value: 25, label: 'SP' },
      { value: 26, label: 'TO' },
    ];
  }
  getDiaSemana(){
    return [
      {value: 0, label: 'Domingo'},
      {value: 1, label: 'Segunda'},
      {value: 2, label: 'Terça'},
      {value: 3, label: 'Quarta'},
      {value: 4, label: 'Quinta'},
      {value: 5, label: 'Sexta'},
      {value: 6, label: 'Sábado'},
    ]
  }
  getEstadoCivil(){
    return [
      {value: 0, label: 'Solteiro'},     
      {value: 1, label: 'Casado'},     
      {value: 2, label: 'Separado'},     
      {value: 3, label: 'Divorciado'},     
      {value: 4, label: 'Viuvo'},      
    ]
  }
  getGenero(){
    return [      
      {value: 0, label: 'Masculino'},   
      {value: 1, label: 'Feminino'},     
      {value: 2, label: 'Outros'},       
    ]
  }
  getPerfilUsuario(){
    return[
      {value: 0, label: 'Administrador'},
      {value: 1, label: 'Profissional da Saude'},
      {value: 2, label: 'Recpcao'}
    ]
  }
  getRepeticaoAgendamento(){
    return [
      {value: 0, label: 'NaoRepete'}, 
      {value: 0, label: 'Diaria'},    
      {value: 0, label: 'Semanal'},     
      {value: 0, label: 'Quinzenal'},     
      {value: 0, label: 'Mensal'},     
      {value: 0, label: 'Trimestral'},     
      {value: 0, label: 'Semestral'},        
      {value: 0, label: 'Anual'},         
    ]
  }
  getSituacaoAgendamento(){
    return [
      {value: 0, label: 'Aguardando Confirmação'},     
      {value: 1, label: 'Confirmado'},     
      {value: 99, label: 'Cancelado'}       
    ]
  }
  getStatusAtendimento(){
    return[
      {value: 0, label: 'Chegada'},     
      {value: 1, label: 'Triagem'},     
      {value: 2, label: 'Especialista'},     
      {value: 3, label: 'Saída'}
    ]
  }
  getTipoAtendimento(){
    return[
      {value: 0, label: 'Prioritario'},     
      {value: 1, label: 'Prioritario Agendado'},     
      {value: 2, label: 'Comum'},     
      {value: 3, label: 'Comum Agendado'}
    ]
  }
  getTipoContato(){
    return [
      {value: 0, label: 'Residencial'},
      {value: 1, label: 'Comercial'},
      {value: 2, label: 'Outros'},
    ]
  }
  getTipoPrescrição(){
    return [
      {value: 0, label: 'Medicamento'},
      {value: 1, label: 'Exame'},
      {value: 2, label: 'Vacina'},
    ]
  }
}

