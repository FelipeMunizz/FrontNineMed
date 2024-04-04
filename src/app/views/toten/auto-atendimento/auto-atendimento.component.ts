import { Component, OnInit } from '@angular/core';
import { SenhaToten } from 'app/shared/models/toten.model';

@Component({
  selector: 'app-auto-atendimento',
  templateUrl: './auto-atendimento.component.html',
  styleUrls: ['./auto-atendimento.component.scss']
})
export class AutoAtendimentoComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit(): void {
  }

  GerarSenha(tipoAtendimento: number) {
    var item = new SenhaToten;
    item.dataHoraCriacao = item.dataHoraAtualizacao = new Date;
    item.tipoAtendimento = tipoAtendimento;
    item.statusAtendimento = 0;
  }
}
