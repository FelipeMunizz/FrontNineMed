import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { User } from "app/shared/models/user.model";
import { FuncionarioService } from "app/shared/services/app-models/funcionario.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { EnumService } from "app/shared/services/enum.service";
import { ChamadaSenhaModalComponent } from "./chamada-senha-modal/chamada-senha-modal.component";

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
    private enumService: EnumService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() { }
  ngOnInit() {
  }

  openModalChamada() {
    const dialogRef = this.dialog.open(ChamadaSenhaModalComponent, {
      width: '50%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
