import { Component, HostListener } from '@angular/core';
import { HeaderAction } from '../../../shared/types';

@Component({
  selector: 'app-main-layout-component',
  standalone: false,
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.scss',
})
export class MainLayoutComponent {
  isSidebarOpen = false;
  isMobile = false;

  headerActions: HeaderAction[] = [
    { icon: 'account_circle', label: 'Profile', actionType: 'profile' },
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
  }

  handleHeaderAction(action: string) {
    switch (action) {
      case 'notifications':
        console.log('Open notifications panel');
        break;
      case 'profile':
        console.log('Open profile menu');
        break;
    }
  }
}
