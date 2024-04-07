import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SenhaToten } from 'app/shared/models/toten.model';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-lista-chamada',
  templateUrl: './lista-chamada.component.html',
  styleUrls: ['./lista-chamada.component.scss']
})
export class ListaChamadaComponent implements OnInit {
  idToten: number;
  dispplayColuns: string[] = ['senhaPainel', 'dataHora'];
  dataSource: MatTableDataSource<SenhaToten> = new MatTableDataSource<SenhaToten>();   

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  private timerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private totenService: TotenService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idToten = params['idToten']
    });

    this.ListarSenhasPainel();

    this.timerSubscription = interval(1000).pipe(
      switchMap(() => interval(10000)) 
    ).subscribe(() => {
      this.ListarSenhasPainel();
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ListarSenhasPainel() {
    this.totenService.ListarSenhasPainel(this.idToten)
      .subscribe((senhas) => {
        this.dataSource = new MatTableDataSource(senhas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
}
