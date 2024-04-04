import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SenhaToten } from 'app/shared/models/toten.model';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-auto-atendimento',
  templateUrl: './auto-atendimento.component.html',
  styleUrls: ['./auto-atendimento.component.scss']
})
export class AutoAtendimentoComponent implements OnInit {
  idToten: number;

  constructor(
    private route: ActivatedRoute,
    private totenService: TotenService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idToten = params['idToten']
    })
  }

  GerarSenha(tipoAtendimento: number) {
    var item = new SenhaToten;
    item.tipoAtendimento = tipoAtendimento;
    item.idToten = this.idToten;

    this.totenService.AdicionarSenhaToten(item)
    .subscribe((retorno) => {
      if(retorno.success){
        console.log(retorno.result.senhaPainel)
      }
      else{
        this.utilityService.MostraToastr('Erro', retorno.message, 'erro')
      }
    },
    (retorno) => {
      this.utilityService.MostraToastr('Erro', retorno.message, 'erro')
    })
  }
}
