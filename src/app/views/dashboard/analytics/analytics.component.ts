import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { User } from "app/shared/models/user.model";
import { FuncionarioService } from "app/shared/services/app-models/funcionario.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { EnumService } from "app/shared/services/enum.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: matxAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {  
  user: User = {}

  constructor(
    private funcionarioService: FuncionarioService,
    private auth: JwtAuthService,
    private enumService: EnumService
    ) {}

  ngAfterViewInit() {}
  ngOnInit() {
    this.UserFuncionario();
  }

  //Atribui Funcionario ao User
  UserFuncionario(){
    this.user = this.auth.getUser();
    this.funcionarioService.ObterFuncionarioEmail(this.user.displayName)
    .subscribe((func) => {
      debugger
      this.user = new User();
      this.user.displayName = func.nome || func.email;
      this.user.idClinica = func.idClinica;
      this.user.idFuncionario = func.id;
      let perfil = this.enumService.getPerfilUsuario().find((role) => role.value === func.perfil);
      this.user.role = perfil.label;

      this.auth.setUserAndToken(this.auth.getJwtToken(), this.user, this.auth.isLoggedIn())
    })
  }  
}
