import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SelectedModel } from "app/shared/models/selected-model";
import { Toten } from "app/shared/models/toten.model";
import { User } from "app/shared/models/user.model";
import { TotenService } from "app/shared/services/app-models/toten.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
    template: `
    <h2 mat-dialog-title>Toten</h2>
    <form [formGroup]="totenForm">
        <mat-dialog-content class="mat-dialog-content">
        <div class="row">
        <div class="col col-12">
            <mat-form-field class="full-width">
                <mat-label>Toten</mat-label>
                <mat-select matNativeControl formControlName="idToten" class="dorpdown-menu p-16">
                    <mat-option *ngFor="let toten of listaToten" [value]="toten.id">{{toten.name}}</mat-option>
                    <small *ngIf="totenForm.controls['idToten'].touched" class="form-error-msg"> </small>
                </mat-select>
            </mat-form-field>
        </div>
        </div> 
        </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button type="button" mat-button [mat-dialog-close]="false">Cancelar</button> 
          <span fxFlex></span>
          <button class="btn btn-primary" [mat-dialog-close]="true" (click)="SalvarClick()" cdkFocusInitial>Salvar</button>
        </mat-dialog-actions>
    </form>
    `
})

export class TotenModalComponent implements OnInit {
    totenForm: UntypedFormGroup
    user: User = {}
    listaToten: Array<SelectedModel>;
    totenSelected: SelectedModel;

    constructor(
        private authService: JwtAuthService,
        private totenService: TotenService,
        private router: Router
    ) { }
    ngOnInit(): void {
        this.InicializaForm();
        this.ListaTotens()
    }

    InicializaForm() {
        this.totenForm = new UntypedFormGroup({
            idToten: new UntypedFormControl('', [Validators.required])
        })
    }

    ListaTotens() {
        this.user = this.authService.getUser();

        this.totenService.ListaTotensClinica(+this.user.idClinica)
            .subscribe((totens: Array<Toten>) => {
                var listTotens = [];
                totens.forEach(x => {
                    var item = new SelectedModel();
                    item.id = x.id;
                    item.name = x.nome;

                    listTotens.push(item);
                });

                this.listaToten = listTotens;
            })
    }

    SalvarClick() {
        var dados = this.dadosForm();
        var idToten = dados['idToten'].value;

        var url = this.router.serializeUrl(this.router.createUrlTree([`/toten/auto-atendimento`], { queryParams: { idToten: idToten } }));
        window.open(url, '_blank');
    }

    dadosForm() {
        return this.totenForm.controls;
    }
}