import {  Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.scss']
})
export class ClinicaComponent implements OnInit {
  formData = {}
  logoBase64: string | undefined;
  console = console;
  clinicaForm: UntypedFormGroup;
  color: ThemePalette = 'accent';
  checked = false;

  constructor(
    private snac: MatSnackBar) { }

  ngOnInit() {
    this.clinicaForm = new UntypedFormGroup({
      nome: new UntypedFormControl('', [        
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      inscricaoMunicipal: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(11)
      ]),
      inscricaoEstadual: new UntypedFormControl('',[
        Validators.maxLength(9)
      ]),
      fantasia: new UntypedFormControl('',[])
    })
  };

  onKeyPress(event: any): void {
    const keyCode = event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
      event.preventDefault();
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      if (this.isImageFile(file)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.logoBase64 = reader.result as string;
        };

        reader.readAsDataURL(file);
      } else {
        this.snac.open('Por favor, selecione um arquivo de imagem válido.','',{duration: 3000});
      }
    }
  }

  private isImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const fileType = file.type;

    return allowedTypes.includes(fileType);
  }  

  submit(){
    
  }

}
