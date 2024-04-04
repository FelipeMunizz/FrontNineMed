import { Component, OnInit, EventEmitter, Input, ViewChildren, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { Router } from '@angular/router';
import { TotenService } from 'app/shared/services/app-models/toten.service';
import { SelectedModel } from 'app/shared/models/selected-model';
import { Toten } from 'app/shared/models/toten.model';
import { User } from 'app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { TotenModalComponent } from './modal/totens.modal.componentt';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'es'
  }];
  currentLang = this.availableLangs[0];

  public matxThemes;
  public layoutConf: any;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.matxThemes = this.themeService.matxThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
  }

  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, { transitionClass: true });
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, { transitionClass: true });

  }

  OpenToten() {
    const dialogRef = this.dialog.open(TotenModalComponent, {
      width: '40vh',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
