import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ec-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss']
})
export class TableSortComponent implements OnInit {
  @Input() totalCount: number;
  @Input() tableContentType: string;
  @Input() sortFields: string[];
  @Input() activeSortField: string;
  @Input() activeSortDirection: string;
  @Output() sortChange: EventEmitter<any> = new EventEmitter();

  private sort: { [key: string]: string } = {};
  private selectedSortField: string = this.activeSortField;

  ngOnInit(): void {
    this.sortFields.forEach(sortField => {
      this.sort[sortField] = 'asc';
    });
  }

  public onSortFieldChange(sortField: string) {
    this.selectedSortField = sortField;
    this.emitSortChange();
  }

  public onSortDirectionChange(sortField: string) {
    this.selectedSortField = sortField;
    this.sort[sortField] = this.sort[sortField] === 'asc' ? 'desc' : 'asc';
    this.emitSortChange();
  }

  public isAscSort(sortField: string): boolean {
    return this.sort[sortField] === 'asc';
  }

  public isSortActive(sortField: string) {
    return this.selectedSortField === sortField;
  }

  private emitSortChange() {
    const sort = {
      sortField: this.selectedSortField,
      sortDirection: this.sort[this.selectedSortField],
    };
    this.sortChange.emit(sort);
  }
}
