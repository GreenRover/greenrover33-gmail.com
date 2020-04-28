import { Page } from './../../api/model/page';
import { Coaster } from './../../api/model/coaster';
import { CoasterService } from './../../api/api/coaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page: Page<Coaster> = {
    content: [],
    number: 1,
    totalPages: 1,
  };

  constructor(
    private coasterApi: CoasterService
  ) { }

  ngOnInit(): void {
    this.loadPage(1);
  }

  private loadPage(p: number) {
    this.coasterApi.paged((p - 1), 25).subscribe(page => {
      this.page = page;
      console.log(page);
    });
  }

  public goToPage(page: number) {
    this.loadPage(page);
  }

}
