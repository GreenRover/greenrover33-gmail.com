import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { bufferTime, filter } from 'rxjs/operators';
import { LtaService } from './../../api/api/lta.service';
import { ZugPos, ZugPosDb } from './zug-pos-db.service';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css']
})
export class ZugPosComponent implements OnInit {
  public dataSource = new MatTableDataSource<ZugPos>();
  public displayedColumns: string[] = ['zug', 'station', 'gleis'];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  // @ViewChild('filterField')
  // filterField: HTMLSelectElement;

  public filterType;

  constructor(
    private ltaService: LtaService,
    private zugPosDb: ZugPosDb
  ) { }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (zugPos: ZugPos, filterStr: string) => {
      return zugPos.zug.toLowerCase() === filterStr.toLowerCase() ||
        zugPos.station.toLowerCase().startsWith(filterStr.toLowerCase()) ||
        zugPos.gleis.toLowerCase() === filterStr.toLowerCase();
    };

    this.ltaService.znv() //
      .pipe(
        filter(znt => znt.typ === 'ORT'),
        filter(znt => Boolean(znt.bisZugIdentifikation.zugnummer)),
        bufferTime(1000)
      )
      .subscribe(znts => {
        console.log(znts);

        this.zugPosDb.saveZugPos(
          znts.map(zn => {
            return {
              zug: zn.bisZugIdentifikation.zugnummer,
              station: zn.bisStation,
              gleis: zn.bisGleisName
            };
          })
        );

        this.zugPosDb.getLatesPosPerZug()
          .then(zugPositions => this.dataSource.data = zugPositions);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
