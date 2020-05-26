import { Component, OnInit } from '@angular/core';
import { bufferTime, filter } from 'rxjs/operators';
import { LtaService } from './../../api/api/lta.service';
import { ZugPos, ZugPosDb } from './zug-pos-db.service';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css']
})
export class ZugPosComponent implements OnInit {

  constructor(
    private ltaService: LtaService,
    private zugPosDb: ZugPosDb
  ) { }

  public zugPos: ZugPos[] = [];
  public currentZug = '';

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
    this.currentZug = zugNummer;
  }
}
