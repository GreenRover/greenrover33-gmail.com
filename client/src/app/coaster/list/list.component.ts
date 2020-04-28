import { Coaster } from './../../api/model/coaster';
import { Page, EmptyPage } from './../../api/model/page';
import { CoasterService } from './../../api/api/coaster.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public itemsPerPage: number;
  public page: Page<Coaster> = new EmptyPage();

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    public coasterService: CoasterService
  ) {
    this.itemsPerPage = 25;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params[`page`]) {
        const pageNr = parseInt(params[`page`], 10);
        this.coasterService.paged(pageNr - 1, this.itemsPerPage, 'body').subscribe(page => {
          this.page = page;
        });
      }
    });
  }

  displayPage(pageNr: number) {
    this.router.navigate(['coaster/list/', pageNr]);
  }

  delete(id: number): void {
    this.coasterService.delete(id).subscribe(status => {
      console.log(id + ' was deleted');
      this.ngOnInit();
    });
  }
}
