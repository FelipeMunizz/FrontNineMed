import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SenhaToten } from 'app/shared/models/toten.model';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { MidiaService } from 'app/shared/services/midia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-chamada',
  templateUrl: './lista-chamada.component.html',
  styleUrls: ['./lista-chamada.component.scss']
})
export class ListaChamadaComponent implements OnInit {
  idToten: number;
  dispplayColuns: string[] = ['senhaPainel', 'dataHora'];
  dataSource: MatTableDataSource<SenhaToten> = new MatTableDataSource<SenhaToten>();
  senhaChamada: SenhaToten = new SenhaToten;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private totenService: TotenService,
    private midiaService: MidiaService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idToten = params['idToten']
    });

    this.ListarSenhasPainel();
  }

  ListarSenhasPainel() {
    this.totenService.ListarSenhasPainel(this.idToten)
      .subscribe((senhas) => {
        if(senhas[0].id != this.senhaChamada.id){
          this.midiaService.playSound();
          this.midiaService.speak(`Senha ${senhas[0].senhaPainel}`)
        }

        this.senhaChamada = senhas.shift();
        this.dataSource = new MatTableDataSource(senhas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        setTimeout(() => {
          this.ListarSenhasPainel();
        }, 3000);
      });
  }

  formatarData(dataString: string): string {
    const data = new Date(dataString)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return data.toLocaleDateString('pt-BR', options);
  }

  isEven(row: any): boolean {
    const index = this.dataSource.data.indexOf(row);
    return index % 2 === 0;
  }

  AtualizaLista() {
    //timer
    this.ListarSenhasPainel();
  }
}
