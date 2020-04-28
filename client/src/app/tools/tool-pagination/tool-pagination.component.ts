import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-pagination',
  templateUrl: './tool-pagination.component.html',
  styleUrls: ['./tool-pagination.component.css']
})
export class ToolPaginationComponent implements OnChanges {

  @Input()
  public totalPages: number;

  @Input()
  public currentPage = 1;

  @Output()
  public pageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];

  constructor() { }

  ngOnChanges(): void {
    let minPage = this.currentPage - 5;
    if (minPage < 1) {
      minPage = 1;
    }

    let maxPage = minPage + 11;
    if (maxPage > this.totalPages) {
      maxPage = this.totalPages;
    }

    this.pages.length = 0;
    for (let i = minPage; i < maxPage; i++) {
      this.pages.push(i);
    }
  }

  public choosePage(page: number) {
    this.pageChange.emit(page);
  }

}
