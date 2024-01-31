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
      type: 'separator'
    },
    {
      name: 'Cadastros',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'library_add',
      sub: [
        { name: 'Clinica', state: 'cadastros/clinica', icon: 'store' },
        { name: 'Paciente', state: 'cadastros/paciente', icon: 'person' },
        { name: 'Funcionario', state: 'cadastros/funcionario', icon: 'support_agent' },
      ]
    },
    {
      name: 'FORMS',
      type: 'separator'
    },
    {
      name: 'BASIC',
      state: 'forms/basic',
      type: 'link',
      icon: 'description',
    },
    {
      name: 'EDITOR',
      state: 'forms/editor',
      type: 'link',
      icon: 'subject',
    },
    {
      name: 'UPLOAD',
      state: 'forms/upload',
      type: 'link',
      icon: 'upload',
    },
    {
      name: 'WIZARD',
      state: 'forms/wizard',
      type: 'link',
      icon: 'grain',
    }
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
