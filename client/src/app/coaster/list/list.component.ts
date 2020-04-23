import { CoasterService } from './../../api/api/coaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private coasterApi: CoasterService
  ) { }

  ngOnInit(): void {
    this.coasterApi.paged(1, 25).subscribe(page => {
      console.log(page);
    });
  }

}
