import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageData } from '@app/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() pageData: PageData;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pageNumberArray: number[];
  currentPage: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageData']) {
      this.pageNumberArray = Array.from(Array(this.pageData.totalPages).keys());
      this.currentPage = this.pageData.pageable.pageNumber + 1;
    }
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
