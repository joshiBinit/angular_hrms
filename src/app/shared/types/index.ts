export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

export interface HeaderAction {
  icon: string;
  label?: string; // Optional tooltip or aria-label
  actionType: string; // e.g., 'notifications', 'profile'
  show?: boolean; // Optional condition to show/hide
}
