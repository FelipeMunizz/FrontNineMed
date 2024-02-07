import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    private funcionarioService: FuncionarioService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(){
  }

}
