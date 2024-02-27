import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Convenio } from 'app/shared/models/convenio.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { ConvenioService } from 'app/shared/services/app-models/convenio.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.component.html',
  styleUrls: ['./procedimento.component.scss']
})
export class ProcedimentoComponent implements OnInit {
  isAutorizado: boolean = true;
  user: User = {}
  tipoTela: number = 1;
  procedimentoForm: UntypedFormGroup;
  dispplayColuns: string[] = ['id', 'nome', 'preco', 'duracao', 'acoes'];
  dataSource: MatTableDataSource<Convenio> = new MatTableDataSource<Convenio>();

  convenioEdicao: Convenio;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private convenioService: ConvenioService,
    private auth: JwtAuthService,
    private utility: UtilityService,
    private modal: AppConfirmService
  ) { }

  ngOnInit(): void {
  }

}
