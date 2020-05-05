import { Page } from './../../api/model/page';
import { Coaster } from './../../api/model/coaster';
import { CoasterService } from './../../api/api/coaster.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
    private coasterApi: CoasterService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.page) {
        this.loadPage(params.page);
      } else {
        console.log('Missing parameter page');
      }
    });
  }

  private loadPage(p: number) {
    this.coasterApi.paged((p - 1), 25).subscribe(page => {
      this.page = page;
      // console.log(page.content[0].getOpenDateAsDate());
      console.log(page);
    });
  }

  public goToPage(page: number) {
    this.router.navigate(['coaster/list/', page]);
  }

}
