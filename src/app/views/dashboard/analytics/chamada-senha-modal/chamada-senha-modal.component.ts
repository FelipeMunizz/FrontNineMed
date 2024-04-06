import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SenhaToten } from 'app/shared/models/toten.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-chamada-senha-modal',
  templateUrl: './chamada-senha-modal.component.html',
  styleUrls: ['./chamada-senha-modal.component.scss']
})
export class ChamadaSenhaModalComponent implements OnInit {

  constructor(
    private totenService: TotenService,
    private localStorage: LocalStoreService,
    private loader: AppLoaderService,
    private utility: UtilityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CarregaSenhasPentens();
  }

  CarregaSenhasPentens() {
    this.loader.open('Aguarde...');
    this.totenService.ListaSenhaTotenTipoAtendimento(0, 1)
      .subscribe((response) => {
        this.localStorage.setItem('senhasPrioritario', response);
      });

    this.totenService.ListaSenhaTotenTipoAtendimento(1, 1)
      .subscribe((response) => {
        this.localStorage.setItem('senhasPrioritarioAgendado', response);
      });

    this.totenService.ListaSenhaTotenTipoAtendimento(2, 1)
      .subscribe((response) => {
        this.localStorage.setItem('senhasComum', response);
      });

    this.totenService.ListaSenhaTotenTipoAtendimento(3, 1)
      .subscribe((response) => {
        this.localStorage.setItem('senhasComumAgendado', response);
      });

    this.loader.close();
  }

  ChmarPrioritaritario() {
    let listaSenhasPrioritario = this.localStorage.getItem('senhasPrioritario');

    if (listaSenhasPrioritario && listaSenhasPrioritario.length > 0) {
      let senhaChamada = listaSenhasPrioritario.shift();

      this.localStorage.setItem('senhasPrioritario', listaSenhasPrioritario);
      this.localStorage.setItem('senhaChamada', senhaChamada);
      this.utility.MostraToastr('Sucesso', 'Senha chamada.', 'sucesso');
      this.Atualizarsenha(senhaChamada);
      this.dialog.closeAll();
    } else {
      this.utility.MostraToastr('Atneção','Não há senhas prioritárias na lista.', 'aviso');
    }
  }
  
  ChamarPrioritarioAgendado() {
    let listaSenhasPrioritarioAgendado = this.localStorage.getItem('senhasPrioritarioAgendado');

    if (listaSenhasPrioritarioAgendado && listaSenhasPrioritarioAgendado.length > 0) {
      let senhaChamada = listaSenhasPrioritarioAgendado.shift();

      this.localStorage.setItem('senhasPrioritarioAgendado', listaSenhasPrioritarioAgendado);
      this.localStorage.setItem('senhaChamada', senhaChamada);
      this.utility.MostraToastr('Sucesso', 'Senha chamada.', 'sucesso');      
      this.Atualizarsenha(senhaChamada);
      this.dialog.closeAll();
    } else {
      this.utility.MostraToastr('Atneção','Não há senhas prioritárias agendadas na lista.', 'aviso');
    }
  }

  ChamarComum() {
    let listaSenhasComum = this.localStorage.getItem('senhasComum');

    if (listaSenhasComum && listaSenhasComum.length > 0) {
      let senhaChamada = listaSenhasComum.shift();

      this.localStorage.setItem('senhasComum', listaSenhasComum);
      this.localStorage.setItem('senhaChamada', senhaChamada);
      this.utility.MostraToastr('Sucesso', 'Senha chamada.', 'sucesso');
      this.Atualizarsenha(senhaChamada);
      this.dialog.closeAll();
    } else {
      this.utility.MostraToastr('Atneção','Não há senhas Comuns na lista.', 'aviso');
    }
  }

  ChamarComumAgendado() {
    let listaSenhasComumAgendado = this.localStorage.getItem('senhasComumAgendado');

    if (listaSenhasComumAgendado && listaSenhasComumAgendado.length > 0) {
      let senhaChamada = listaSenhasComumAgendado.shift();

      this.localStorage.setItem('senhasComumAgendado', listaSenhasComumAgendado);
      this.localStorage.setItem('senhaChamada', senhaChamada);
      this.utility.MostraToastr('Sucesso', 'Senha chamada.', 'sucesso');
      this.Atualizarsenha(senhaChamada);
      this.dialog.closeAll();
    } else {
      this.utility.MostraToastr('Atneção','Não há senhas Comuns Agendadas na lista.', 'aviso');
    }
  }

  Atualizarsenha(senhaToten: SenhaToten){
    senhaToten.statusAtendimento = 1;
    this.totenService.AtualizarSenhaToten(senhaToten)
    .subscribe(() => {}, () => {})
  }
}
