import { Component, OnInit } from '@angular/core';
import { ReportService } from './../../../shared/services/report.service';
import { AtestadoReport } from 'app/shared/models/atendimento.model';
import { AtendimentoService } from 'app/shared/services/app-models/atendimento.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-atestado-report',
  templateUrl: './atestado-report.component.html',
  styleUrls: ['./atestado-report.component.scss']
})
export class AtestadoReportComponent implements OnInit {
  atestado: AtestadoReport = new AtestadoReport();
  idPaciente: number = 0;
  idAtendimento: number = 0;
  url: string = `atendimento/atendimento?cd=${this.idPaciente}&cdAtend=${this.idAtendimento}`;

  constructor(
    private reportService: ReportService,
    private atendimentoService: AtendimentoService,
    private utility: UtilityService,    
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.LoadDadosReport(1);
  }

  LoadDadosReport(idAtendimento: number) {
    this.atendimentoService.ObterAtestadoRelatorio(idAtendimento).subscribe((data) => {
      if(!data){
        this.ErrorRequest();
      }
      this.atestado = data;
    },
      (error) => {
        this.ErrorRequest();
    });
  }

  exportarPDF(): void {
    this.reportService.exportToPDF('relatorio', 'Relatorio');
  }

  imprimir(): void {
    this.reportService.print('relatorio');
  }

  ErrorRequest(){
    this.utility.MostraToastr('Error', 'Erro ao carregar dados do atestado', 'erro');
    this.router.navigateByUrl(this.url);
  }

  SanitizeImage(base64String: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`${base64String}`);
  }
}
