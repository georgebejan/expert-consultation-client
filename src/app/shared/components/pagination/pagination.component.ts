import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageData, PageRequest } from '@app/core';

@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() pageData: PageData;
  @Output() pageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

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
    this.pageChange.emit(new PageRequest(page - 1));
  }
}
