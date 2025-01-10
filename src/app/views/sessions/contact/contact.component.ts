import { Component, OnInit } from "@angular/core"
import {
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
} from "@angular/forms"
import { UserService } from "app/shared/services/auth/user.service"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  sendContactForm: UntypedFormGroup
  errorMsg = ""

  constructor(private userService:UserService) {}

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
      this.userService.sendEmailToContact(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      )
    } else {
      this.errorMsg = "Por favor, preencha todos os campos obrigatórios."
    }
  }
}
