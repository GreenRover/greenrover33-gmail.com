import { ZugPosDetailComponent, ZugPosDetailDialogComponent } from './zug-pos.detail.component';
import { ApplicationStateService } from './../../tools/applicationState.service';
import { ZugPosListComponent } from './zug-pos.list.component';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { bufferTime, filter } from 'rxjs/operators';
import { LtaService } from './../../api/api/lta.service';
import { ZugPos, ZugPosDb } from './zug-pos-db.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css']
})
export class ZugPosComponent implements OnInit {

  constructor(
    private ltaService: LtaService,
    private zugPosDb: ZugPosDb,
    public ass: ApplicationStateService,
    public dialog: MatDialog
  ) { }

  public zugPos: ZugPos[] = [];
  public currentZug = '';

  @ViewChild('dasSucheIch')
  dieZugListe: ZugPosListComponent;

  @ViewChildren(ZugPosListComponent)
  dieZugListen: QueryList<ZugPosListComponent>;

  ngOnInit(): void {
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
          .then(zugPositions => this.zugPos = zugPositions);
      });
  }

  displayZugDetails(zugNummer) {
    if (this.ass.isMobileResolution()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        zugNr: zugNummer
      };
      dialogConfig.minWidth = '400px';
      dialogConfig.width = '90%';
      dialogConfig.height = '90%';
      this.dialog.open(ZugPosDetailDialogComponent, dialogConfig);
    } else {
      this.currentZug = zugNummer;
    }



    this.dieZugListe.sayHallo('Welt ' + zugNummer);
    this.dieZugListen.forEach(z => {
      z.sayHallo('Home ' + zugNummer);
    });
  }
}
