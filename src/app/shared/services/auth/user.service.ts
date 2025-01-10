import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "app/shared/models/register-user.model";
import { environment } from "environments/environment";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment.apiURL + "/Users"

  public CreateUser(registerUser: RegisterUser) {
    const url = `${this.baseUrl}/CreateUser`
    return this.httpClient.post<any>(url, registerUser)
  }

  public ObterUsaurio(email: string) {
    const url = `${this.baseUrl}/ObterUsuario?email=${email}`
    return this.httpClient.get<any>(url)
  }

  public EditUser(id: string, registerUser: RegisterUser) {
    const url = `${this.baseUrl}/EditUser/${id}`
    return this.httpClient.put<any>(url, registerUser)
  }

  public DeletarUsuario(id: string) {
    return this.httpClient.delete<any>(
      `${this.baseUrl}/DeletarUsuario?id=${id}`
    )
  }

  sendEmailToContact(name, email, subject, message) {
    return this.httpClient
      .post(`${environment.apiURL}/SendEmail`, {
        name,
        email,
        subject,
        message,
      })
      .pipe(
        catchError((error) => {
          return throwError(error)
        })
      )
  }

}