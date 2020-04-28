import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LtaService } from './../../api/api/lta.service';
import { MatTableDataSource } from '@angular/material/table';
import { bufferTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css']
})
export class ZugPosComponent implements OnInit {

  zugPos: Map<string, ZugPos> = new Map();
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['zug', 'station', 'gleis'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private ltaService: LtaService
  ) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    window.setTimeout(() => {
      this.ltaService.subscribeZnv() //
        .pipe(
          filter(znt => znt.typ === 'ORT'),
          filter(znt => !!znt.bisZugIdentifikation.zugnummer),
          bufferTime(1000) // dont overload the browser, only process it once a second.
        )
        .subscribe(znts => {
          console.log(znts);
          for (const znt of znts) {
            const zn = znt.bisZugIdentifikation.zugnummer;

            this.zugPos.set(zn, {
              station: znt.bisStation,
              gleis: znt.bisGleisName
            });
          }

          // Flatt the data.
          this.dataSource.data = [...this.zugPos.entries()].map(e => {
            return {
              zug: e[0],
              station: e[1].station,
              gleis: e[1].gleis,
            };
          });
        });
    }, 500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

interface ZugPos {
  station: string;
  gleis: string;
}
