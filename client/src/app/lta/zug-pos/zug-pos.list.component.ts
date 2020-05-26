import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZugPos } from './zug-pos-db.service';

@Component({
  selector: 'app-zug-pos-list',
  templateUrl: './zug-pos.list.component.html',
  styleUrls: ['./zug-pos.list.component.css']
})
export class ZugPosListComponent implements OnInit {
  public dataSource = new MatTableDataSource<ZugPos>();
  public displayedColumns: string[] = ['zug', 'station', 'gleis'];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  // @ViewChild('filterField')
  // filterField: HTMLSelectElement;

  @Input()
  public set zugPositions(zugPos: ZugPos[]) {
    this.dataSource.data = zugPos;
  }

  @Output()
  zugSelected = new EventEmitter<string>();

  public filterType;

  ngOnInit(): void {
    this.dataSource.data = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (zugPos: ZugPos, filterStr: string) => {
      return zugPos.zug.toLowerCase() === filterStr.toLowerCase() ||
        zugPos.station.toLowerCase().startsWith(filterStr.toLowerCase()) ||
        zugPos.gleis.toLowerCase() === filterStr.toLowerCase();
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayZugDetails(zugNummer) {
    this.zugSelected.emit(zugNummer);
  }

  public sayHallo(postion: string) {
    console.log('Hallo ' + postion);
  }
}
