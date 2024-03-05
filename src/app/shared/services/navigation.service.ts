import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      state: 'dashboard/analytics',
      type: 'link',
      icon: 'dashboard',
    },
    {
      name: 'Cadastros',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'library_add',
      sub: [
        { name: 'Pacientes', state: 'cadastros/paciente', icon: 'person' },
        { name: 'Clinica', state: 'cadastros/clinica', icon: 'store' },
        { name: 'Funcionarios', state: 'cadastros/funcionario', icon: 'support_agent' },
        { name: 'Convenios', state: 'cadastros/convenio', icon: 'volunteer_activism' },
        { name: 'Procedimentos', state: 'cadastros/procedimento', icon: 'vaccines' },
        { name: 'Totens', state: 'cadastros/toten', icon: 'view_timeline' },
      ]
    },
    {
      name: 'Financeiro',
      state: 'financeiro/controle',
      type: 'link',
      icon: 'attach_money'
    },
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() { }
}
