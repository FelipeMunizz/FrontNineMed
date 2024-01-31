import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
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
}

