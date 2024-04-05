import { Component, OnInit, AfterViewInit, ViewChild, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { 
  Router, 
  NavigationEnd, 
  RouteConfigLoadStart, 
  RouteConfigLoadEnd, 
  ResolveStart, 
  ResolveEnd, 
  ActivatedRoute
} from '@angular/router';
import { Subscription } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { LayoutService } from '../../../services/layout.service';
import { filter } from 'rxjs/operators';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { User } from 'app/shared/models/user.model';
import { FuncionarioService } from 'app/shared/services/app-models/funcionario.service';
import { EnumService } from 'app/shared/services/enum.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html',
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;
  private user: User = {  }

  public  scrollConfig = {}
  public layoutConf: any = {};
  public adminContainerClasses: any = {};
  
  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,    
    private funcionarioService: FuncionarioService,
    private auth: JwtAuthService,
    private enumService: EnumService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

    })
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((routeChange: NavigationEnd) => {
      this.layout.adjustLayout({ route: routeChange.url });
      this.scrollToTop();
    });
    
    // Translator init
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    // this.layoutConf = this.layout.layoutConf;
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
        this.layoutConf = layoutConf;
        // console.log(this.layoutConf);
        
        this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
        this.cdr.markForCheck();
    });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if(event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if(event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }
  
  ngAfterViewInit() {

  }

  isTotenRoute(): boolean {
    var teste = this.router.url.includes('toten');
    return teste
  }
  
  scrollToTop() {
    if(document) {
      setTimeout(() => {
        let element;
        if(this.layoutConf.topbarFixed) {
          element = <HTMLElement>document.querySelector('#rightside-content-hold');
        } else {
          element = <HTMLElement>document.querySelector('#main-content-wrap');
        }
        element.scrollTop = 0;
      })
    }
  }
  ngOnDestroy() {
    if(this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }
  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  sidebarMouseenter(e) {
    // console.log(this.layoutConf);
    if(this.layoutConf.sidebarStyle === 'compact') {
        this.layout.publishLayoutChange({sidebarStyle: 'full'}, {transitionClass: true});
    }
  }

  sidebarMouseleave(e) {
    // console.log(this.layoutConf);
    if (
        this.layoutConf.sidebarStyle === 'full' &&
        this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({sidebarStyle: 'compact'}, {transitionClass: true});
    }
  }

  updateAdminContainerClasses(layoutConf) {
    return {
      'navigation-top': layoutConf.navigationPos === 'top',
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact': layoutConf.sidebarStyle === 'compact' && layoutConf.navigationPos === 'side',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big': layoutConf.sidebarStyle === 'compact-big' && layoutConf.navigationPos === 'side',
      'sidebar-opened': layoutConf.sidebarStyle !== 'closed' && layoutConf.navigationPos === 'side',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar': layoutConf.topbarFixed && layoutConf.navigationPos === 'side'
    }
  }

  
  //Atribui Funcionario ao User
  UserFuncionario(){
    this.user = this.auth.getUser();
    this.funcionarioService.ObterFuncionarioEmail(this.user.displayName)
    .subscribe((func) => {
      this.user = new User();
      this.user.displayName = func.email;
      this.user.name = func.nome;
      this.user.idClinica = func.idClinica;
      this.user.idFuncionario = func.id;
      let perfil = this.enumService.getPerfilUsuario().find((role) => role.value === func.perfil);
      this.user.role = perfil.label;

      this.auth.setUserAndToken(this.auth.getJwtToken(), this.user, this.auth.isLoggedIn())
    })
  }
  
}