import { Page, Location, LocationService } from 'src/app/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page: Page<Location> = {
    content: [],
    number: 1,
    totalPages: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private LocationApi: LocationService
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
    this.LocationApi.paged((p - 1), 25).subscribe(page => {
      this.page = page;
      console.log(page);
    });
  }

  public goToPage(page: number) {
    this.router.navigate(['location/list/', page]);
  }

  public delete(id: number) {

  }

}
