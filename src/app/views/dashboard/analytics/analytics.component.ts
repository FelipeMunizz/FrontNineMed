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
      
    this.doughNutPieOptions = {
      backgroundColor: "transparent",
      color: [
        "#F0D500",
        "#14870c",
        "#ffd700"
      ],
      legend: {
        show: true,
        itemGap: 20,
        icon: "circle",
        bottom: 0,
        textStyle: {
          fontSize: 13,
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
          radius: ["45%", "72.55%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: response.result,
        }
      ]

      // series: [
      //   {
      //     name: "Agendamentos",
      //     type: "pie",
      //     radius: ["45%", "72.55%"],
      //     center: ["50%", "50%"],
      //     avoidLabelOverlap: false,
      //     hoverOffset: 0,
      //     emphasis: {disabled: true},
      //     stillShowZeroSum: false,

      //     label: {
      //       normal: {
      //         show: false,
      //         position: "center",
      //         textStyle: {
      //           fontSize: "13",
      //           fontWeight: "normal"
      //         },
      //         formatter: "{a}"
      //       },
      //       emphasis: {
      //         show: true,
      //         textStyle: {
      //           fontSize: "15",
      //           fontWeight: "normal",
      //           color: "rgba(116, 103, 239, 1)"
      //         },
      //         formatter: "{b} \n{c} ({d}%)"
      //       }
      //     },
      //     labelLine: {
      //       normal: {
      //         show: false
      //       }
      //     },
      //     data: response.result,

      //     itemStyle: {
      //       emphasis: {
      //         shadowBlur: 10,
      //         shadowOffsetX: 0,
      //         shadowColor: "rgba(0, 0, 0, 0.5)"
      //       }
      //     }
      //   }
      // ]
    };
    })
  }
}
