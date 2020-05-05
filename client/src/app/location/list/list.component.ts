import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Location, LocationService, Page } from 'src/app/api';

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

  searchFilterValue = '';

  public searchFilterEvent = new Subject<KeyboardEvent>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private LocationApi: LocationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.page) {
        // this.filterNameInput.value
        this.loadPage(
          params.page,
          params.nameFilter || ''
        );
      } else {
        console.log('Missing parameter page');
      }

      this.searchFilterValue = params.nameFilter || '';
    });

    this.searchFilterEvent.pipe(
      map((event: any) => event.target.value),
      debounceTime(500) // How fast is the user are typing
    )
      .subscribe((searchString: string) => {
        this.router.navigate(['location/list/', 1, {
          nameFilter: searchString
        }]);
      });
  }

  private loadPage(p: number, searchString: string) {
    this.LocationApi.paged((p - 1), 25, searchString).subscribe(page => {
      this.page = page;
      console.log(page);
    });
  }

  public goToPage(page: number) {
    this.router.navigate(['location/list/', page]);
  }

  public delete(id: number) {

  }

  public filterForm(event) {
    this.searchFilterEvent.next(event);
  }

}
