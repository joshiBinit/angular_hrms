import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table-component.html',
  styleUrl: './generic-table-component.scss',
})
export class GenericTableComponent {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] | null = [];

  displayedColumns: string[] = [];

  ngOnChanges() {
    this.displayedColumns = this.columns.map((c) => c.field);
  }
}
