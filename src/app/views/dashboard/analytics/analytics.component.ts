import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { User } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { EnumService } from "app/shared/services/enum.service";
import { ChamadaSenhaModalComponent } from "./chamada-senha-modal/chamada-senha-modal.component";
import { ThemeService } from "app/shared/services/theme.service";
import { AgendamentoService } from "app/shared/services/app-models/agendamento.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: matxAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  user: User = {}
  doughNutPieOptions: any;

  constructor(
    private agendamentoService: AgendamentoService,
    private auth: JwtAuthService,
    private enumService: EnumService,
    private dialog: MatDialog,
    private themeService: ThemeService
  ) { }

  ngAfterViewInit() { }
  ngOnInit() {
    this.IniciaGraficoAgendamentos();
  }

  openModalChamada() {
    const dialogRef = this.dialog.open(ChamadaSenhaModalComponent, {
      width: '50%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  IniciaGraficoAgendamentos() {
    this.user = this.auth.getUser();

    this.agendamentoService.GraficoAgendamento(+this.user.idClinica)
      .subscribe((response) => {
        const total = response.result.reduce((acc, curr) => acc + curr.value, 0);

        this.doughNutPieOptions = {
          backgroundColor: "transparent",
          color: [
            "#F0D500", //Aguardando Confirmação
            "#14870c", // Confirmados
            "#f32013"  // Cancelado
          ],
          legend: {
            show: true,
            itemGap: 5,
            icon: "circle",
            bottom: 0,
            textStyle: {
              fontSize: 12,
              fontFamily: "roboto"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: ['20%', '80%']
          },
          xAxis: [
            {
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],

          series: [
            {
              name: 'Agendamentos',
              type: 'pie',
              radius: ["40%", "70%"],
              avoidLabelOverlap: true,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 12,
                  fontWeight: 'bold',
                  distance: 50
                }
              },
              labelLine: {
                show: true
              },
              data: response.result,
            }
          ],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: 'middle',
              style: {
                text: total,
                textAlign: 'center',
                fill: '#333',
                fontSize: 50
              }
            }
          ]
        };
      })
  }
}
