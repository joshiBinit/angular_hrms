import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarItem } from '../../../shared/types';

@Component({
  selector: 'app-sidebar-componentasdasd',
  standalone: false,
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent {
  @Output() menuItemClicked = new EventEmitter<void>();
  menuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Employees', icon: 'people', route: '/employees' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
}
