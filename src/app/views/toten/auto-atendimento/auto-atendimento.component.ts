import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SenhaToten } from 'app/shared/models/toten.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-auto-atendimento',
  templateUrl: './auto-atendimento.component.html',
  styleUrls: ['./auto-atendimento.component.scss']
})
export class AutoAtendimentoComponent implements OnInit {
  idToten: number;
  geraQrCode: boolean = false;
  stringQrCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private totenService: TotenService,
    private utilityService: UtilityService,
    private modalConfirm: AppConfirmService
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
    var imprimir = false;

    this.totenService.AdicionarSenhaToten(item)
      .subscribe((retorno) => {
        var senhaPainel = retorno.result.senhaPainel;
        var dataHoraCriacao = retorno.result.dataHoraCriacao;
        var conteudo = '';
        if (retorno.success) {
          this.modalConfirm.confirm({ title: 'Confirme', message: 'Nossa senha é gerada em QR code, deseja imprimir a senha?' })
            .subscribe((retorno) => {
              if (retorno) {
                conteudo = `
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
                    <div style="font-size: 32px;">${senhaPainel}</div>
                    <div style="font-size: 12px;">${this.formatarData(dataHoraCriacao)}</div>
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
              else{
                this.stringQrCode = senhaPainel;
                this.geraQrCode = true;
              }
            })          
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
