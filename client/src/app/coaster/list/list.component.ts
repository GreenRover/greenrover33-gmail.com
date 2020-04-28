import { Coaster } from './../../api/model/coaster';
import { Page, EmptyPage } from './../../api/model/page';
import { CoasterService } from './../../api/api/coaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public itemsPerPage: number;
  public page: Page<Coaster> = new EmptyPage();

  constructor(
    public coasterService: CoasterService
  ) {
    this.itemsPerPage = 25;
  }

  ngOnInit(): void {
    this.displayPage(1);
  }

  displayPage(pageNr: number) {
    this.coasterService.paged(pageNr - 1, this.itemsPerPage, 'body').subscribe(page => {
      console.log(page);
      this.page = page;
    });
  }

  delete(id: number): void {
    this.coasterService.delete(id).subscribe(status => {
      console.log(id + ' was deleted');
      this.ngOnInit();
    });
  }
}
