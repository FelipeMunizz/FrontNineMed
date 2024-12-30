import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AtestadoAtendimento } from 'app/shared/models/atendimento.model';
import { AtendimentoService } from 'app/shared/services/app-models/atendimento.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { util } from 'echarts';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-modal-atestado',
  templateUrl: './modal-atestado.component.html',
  styleUrls: ['./modal-atestado.component.scss']
})
export class ModalAtestadoComponent implements OnInit {
  atestadoForm: UntypedFormGroup;
  idAtendimento: number

  constructor(
    private util: UtilityService,
    private atendimentoService: AtendimentoService,
    @Inject(MAT_DIALOG_DATA) public data: {
      idAtendimento: number
    }
  ) {
    this.idAtendimento = data.idAtendimento
  }

  ngOnInit() {
    this.IniciaForm();
  }

  IniciaForm() {
    this.atestadoForm = new UntypedFormGroup({
      descricao: new UntypedFormControl(),
      dataFinal: new UntypedFormControl('', [Validators.required])
    })
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  SalvarClick() {
    this.atendimentoService.ObterAtestadoByIdAtendimento(this.idAtendimento)
      .pipe(
        switchMap((response) => {
          var atestado = new AtestadoAtendimento();
          var dados = this.dadosForm();

          atestado.data = dados['dataFinal'].value;
          atestado.descricao = dados['descricao'].value;
          atestado.idAtendimento = this.idAtendimento;

          if (response.success) {
            var atestadoEdit: AtestadoAtendimento = response.result;
            atestado.id = atestadoEdit.id;
            return this.atendimentoService.AtualizarAtestado(atestado);
          } else {
            return this.atendimentoService.AdicionarAtestado(atestado);
          }
        })
      )
      .subscribe(
        (resultado) => {
          const link = document.createElement('a');
          link.href = resultado; 
          link.target = '_blank'; 
          link.rel = 'noopener noreferrer';
          link.click();
        },
        (erro) => {
          this.util.MostraToastr('Error', erro.message, 'erro')
        }
      );
  }

  private dadosForm() {
    return this.atestadoForm.controls;
  }
}
