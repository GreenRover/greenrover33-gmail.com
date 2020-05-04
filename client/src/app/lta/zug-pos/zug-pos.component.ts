import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { bufferTime, filter } from 'rxjs/operators';
import { LtaService } from './../../api/api/lta.service';
import { ApplicationStateService } from './../../tools/applicationState.service';
import { ZugPosDetailsDialogComponent } from './zug-pos-detail.component';
import { ZugPosDb } from './zug-pos.db.service';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css']
})
export class ZugPosComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['zug', 'station', 'gleis'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  detailsZugNr: string;

  constructor(
    private ltaService: LtaService,
    private zugPosDb: ZugPosDb,
    public ass: ApplicationStateService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.ltaService.subscribeZnv() //
      .pipe(
        filter(znt => znt.typ === 'ORT'),
        filter(znt => !!znt.bisZugIdentifikation.zugnummer),
        bufferTime(1000) // dont overload the browser, only process it once a second.
      )
      .subscribe(znts => {
        console.log(znts);

        this.zugPosDb.writeZugPos(znts.map(zn => {
          return {
            zug: zn.bisZugIdentifikation.zugnummer,
            station: zn.bisStation,
            gleis: zn.bisGleisName
          };
        }));

        // Get lates possitions form db.
        this.zugPosDb.getLatesPosPerZug().then(zugPos => {
          this.dataSource.data = zugPos;
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayZugDetails(zugNummer) {
    if (this.ass.isMobileResolution) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        zugNr: zugNummer
      };
      dialogConfig.minWidth = '400px';
      dialogConfig.width = '90%';
      dialogConfig.height = '90%';
      this.dialog.open(ZugPosDetailsDialogComponent, dialogConfig);
    } else {
      this.detailsZugNr = zugNummer;
    }
  }
}
