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
    let password = new UntypedFormControl('', Validators.required);
    let confirmPassword = new UntypedFormControl('');

    this.clinicaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [
        Validators.minLength(4)
      ]),
      firstname: new UntypedFormControl('', [
        Validators.required
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email
      ]),
      website: new UntypedFormControl(''),
      date: new UntypedFormControl(),
      cardno: new UntypedFormControl(''),
      password: password,
      confirmPassword: confirmPassword,
      gender: new UntypedFormControl(''),
      agreed: new UntypedFormControl('', (control: UntypedFormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  };

  submit(){
    
  }

}
