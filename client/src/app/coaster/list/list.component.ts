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
  };

  constructor(
    private coasterApi: CoasterService
  ) { }

  ngOnInit(): void {
    this.coasterApi.paged(1, 25).subscribe(page => {
      this.page = page;
      console.log(page);
    });
  }

}
