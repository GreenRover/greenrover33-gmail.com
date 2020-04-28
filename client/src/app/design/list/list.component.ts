import { Component, OnInit } from '@angular/core';
import { DesignService } from './../../api/api/design.service';

import { Page, EmptyPage } from './../../api/model/page';
import { Design } from './../../api/model/design';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];

  page: Page<Design> = new EmptyPage();

  constructor(
      public designService: DesignService
  ) { }

  ngOnInit(): void {
    this.designService.paged(0, 25, 'body').subscribe(page => {
      console.log(page);
      this.page = page;
    });
  }

  delete(id: number): void {
    this.designService.delete(id).subscribe(status => {
      console.log(id + ' was deleted');
      this.ngOnInit();
    });
  }
}
