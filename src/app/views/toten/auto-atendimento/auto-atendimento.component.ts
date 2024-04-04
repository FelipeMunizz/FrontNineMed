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
        if (retorno.success) {
          let conteudo = `
            <style>
              @media print {
                @page {
                  size: 320px;
                }
                body {
                  width: 320px;
                }
                .conteudo {
                  text-align: center;
                }
              }
            </style>
            <div class="conteudo">
              <div style="font-size: 32px;">${retorno.result.senhaPainel}</div>
              <div style="font-size: 12px;">${this.formatarData(retorno.result.dataHoraCriacao)}</div>
            </div>
          `;
          let janelaImprimir = window.open('', '_blank');
          janelaImprimir.document.open();
          janelaImprimir.document.write(`
            <html>
              <head>
                <title>Impressão</title>
              </head>
              <body>${conteudo}</body>
            </html>`
          );
          janelaImprimir.document.close();
          janelaImprimir.print();
        }
        else {
          this.utilityService.MostraToastr('Erro', retorno.message, 'erro')
        }
      },
        (retorno) => {
          this.utilityService.MostraToastr('Erro', retorno.message, 'erro')
        })
  }

  formatarData(dataString: string): string {
    const data = new Date(dataString)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return data.toLocaleDateString('pt-BR', options);
  }
}
 