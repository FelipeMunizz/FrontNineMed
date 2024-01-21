import {  Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.scss']
})
export class ClinicaComponent implements OnInit {
  formData = {}
  console = console;
  clinicaForm: UntypedFormGroup;

  constructor() { }

  ngOnInit() {
    this.clinicaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [        
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])
    })
  };

  submit(){
    
  }

}
