import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-pagination',
  templateUrl: './tool-pagination.component.html',
  styleUrls: ['./tool-pagination.component.css']
})
export class ToolPaginationComponent implements OnChanges {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Input() activePage = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];

  ngOnChanges() {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
  }

  private getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      const minPage = this.activePage > 5 ? this.activePage - 5 : 1;
      const maxPage = (this.activePage + 5) < pageCount ? this.activePage + 5 : pageCount;
      for (let i = minPage; i <= maxPage; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  choosePage(pageNumber: number) {
    const pageCount = this.getPageCount();

    if (pageNumber < 1) {
      return;
    }

    if (pageNumber > pageCount) {
      return;
    }

    this.activePage = pageNumber;
    this.pages = this.getArrayOfPage(pageCount);

    this.pageChange.emit(this.activePage);
  }
}
