import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/shared/models/user.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { EnumService } from 'app/shared/services/enum.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  user: User = {}
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  // return: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private router: Router,
    private snac: MatSnackBar,
    private funcionarioService: FuncionarioService,
    private enumService: EnumService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new UntypedFormGroup({
      email: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    this.jwtAuth.signin(signinData.email, signinData.password)
      .subscribe(response => {
        this.user = this.jwtAuth.getUser();
        this.funcionarioService.ObterFuncionarioEmail(this.user.displayName)
          .subscribe((func) => {
            this.user = new User();
            this.user.displayName = func.email;
            this.user.name = func.nome;
            this.user.idClinica = func.idClinica;
            this.user.idFuncionario = func.id;
            let perfil = this.enumService.getPerfilUsuario().find((role) => role.value === func.perfil);
            this.user.role = perfil.label;

            this.jwtAuth.setUserAndToken(this.jwtAuth.getJwtToken(), this.user, this.jwtAuth.isLoggedIn())

            this.router.navigateByUrl(this.jwtAuth.return);
          });
      }, err => {
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
        this.errorMsg = err.message;
        this.snac.open(this.errorMsg, '', { duration: 3000 })
      });
  }
}
