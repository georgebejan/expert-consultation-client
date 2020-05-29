import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Filter, PageData, User } from '@app/core';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { merge, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@app/shared/components/base-component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Input() users: User[];
  @Input() pageData: PageData;
  @Input() filter: Filter;
  @Input() loading: boolean;

  @Output() filterChange: EventEmitter<Filter> = new EventEmitter();

  ngAfterViewInit() {
    if (this.sort && this.paginator) {
      merge(this.sort.sortChange, this.paginator.page)
          .pipe(
              switchMap((filterChange: Sort | PageEvent) => {
                if (filterChange['active']) {
                  this.paginator.pageIndex = 0;
                }

                this.filterChange.emit(this.getFilter());
                return of([]);
              }),
              takeUntil(this.destroyed$)
          )
          .subscribe();
    }
  }

  private getFilter(): Filter {
    const filter = new Filter();
    filter.pageNumber = this.paginator.pageIndex;
    filter.sortField = this.sort.active;
    filter.sortDirection = this.sort.direction.toString();

    return filter;
  }
}
