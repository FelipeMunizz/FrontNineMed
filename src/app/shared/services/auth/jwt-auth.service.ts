import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";
import { UtilityService } from "../utility.service";
import { config } from "config";

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User = {};
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  return: string;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "MATX_USER";

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
    // this.route.queryParams
    //   .subscribe(params => this.return = params['return'] || '/');
  }

  public signin(email, password) {    
    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/Account/CreateToken`, { email, password })
      .pipe(
        map((res: any) => {
          this.user = new User();
          this.user.displayName = res.email;
          this.setUserAndToken(res.token, this.user, !!res);
          this.signingIn = false;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public ValidaRolesFuncionario(nivelPermissao: string){
    let funcionarioLogado = new User();
    funcionarioLogado = this.getUser();
    switch(nivelPermissao){
      case 'sa':
        return config.authRoles.sa.includes(funcionarioLogado.role);
      case 'medico':
        return config.authRoles.medico.includes(funcionarioLogado.role);
      case 'recepcao':
        return config.authRoles.recepcao.includes(funcionarioLogado.role);
    }
  }
  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    const token = this.getJwtToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      this.utilityService.MostraToastr('Aviso', 'Sessão encerrada', 'aviso');
      this.signout();
      return false;
    }
  }

  private isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate === null || expirationDate.valueOf() <= new Date().valueOf();
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeJwt(token);
    if (decoded === null || !decoded.hasOwnProperty("exp")) return null;
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate;
  }

  private decodeJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }

  sendEmailToContact(name, email, subject, message) {
    return this.http
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
