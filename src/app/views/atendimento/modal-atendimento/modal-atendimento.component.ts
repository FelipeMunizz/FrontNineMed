import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AtendimentoPaciente } from 'app/shared/models/atendimento.model';

@Component({
  selector: 'app-modal-atendimento',
  templateUrl: './modal-atendimento.component.html',
  styleUrls: ['./modal-atendimento.component.scss']
})
export class ModalAtendimentoComponent implements OnInit {
  atendimentoPaciente: AtendimentoPaciente = new AtendimentoPaciente();
  idPaciente: number = 0;
  atendimentoForm: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      atendimentoPaciente?: AtendimentoPaciente,
      idPaciente: number
    }
  ) {
    this.atendimentoPaciente = data.atendimentoPaciente;
    this.idPaciente = data.idPaciente;
  }

  ngOnInit(): void {
    this.InicializaForm();
  }

  InicializaForm() {
    this.atendimentoForm = new UntypedFormGroup({
      
    })
  }

}
