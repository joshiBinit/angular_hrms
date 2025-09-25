import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table-component.html',
  styleUrl: './generic-table-component.scss',
})
export class GenericTableComponent implements OnInit {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: Employee[] | null = [];
  @Input() showActions = false;
  @Input() actions: { type: string; label: string; color?: string }[] = [];

  @Output() actionClicked = new EventEmitter<{ type: string; row: Employee }>();

  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = this.columns.map((c) => c.field);
    if (this.showActions) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }
  }

  onAction(type: string, row: Employee) {
    this.actionClicked.emit({ type, row });
  }
}
