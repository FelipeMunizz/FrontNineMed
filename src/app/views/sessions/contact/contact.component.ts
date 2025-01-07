import { Component, OnInit } from "@angular/core"
import {
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
} from "@angular/forms"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  sendContactForm: UntypedFormGroup
  errorMsg = ""

  constructor() {}

  ngOnInit() {
    this.sendContactForm = new UntypedFormGroup({
      name: new UntypedFormControl("", [Validators.required]),
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
      subject: new UntypedFormControl("", [Validators.required]),
      message: new UntypedFormControl("", [Validators.required]),
    })
  }

  sendContact() {
    if (this.sendContactForm.valid) {
      const formData = this.sendContactForm.value
      console.log("Form Data: ", formData)
    } else {
      this.errorMsg = "Por favor, preencha todos os campos obrigatórios."
    }
  }
}
