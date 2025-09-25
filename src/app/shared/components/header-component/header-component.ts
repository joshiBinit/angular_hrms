// header-component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderAction } from '../../../shared/types';

@Component({
  selector: 'app-header-component',
  standalone: false,
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})
export class HeaderComponent {
  @Input() title: string = 'App Title';
  @Input() showHamburger: boolean = false;
  @Input() actions: HeaderAction[] = [];

  @Output() hamburgerClicked = new EventEmitter<void>();
  @Output() actionClicked = new EventEmitter<string>();

  onHamburgerClick() {
    this.hamburgerClicked.emit();
  }

  onActionClick(actionType: string) {
    this.actionClicked.emit(actionType);
  }

  get visibleActions(): HeaderAction[] {
    return this.actions.filter((action) => action.show !== false);
  }
}
