import { ChangeDetectorRef, Component, OnInit, ViewContainerRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { bufferTime, filter } from 'rxjs/operators';
import { LtaService } from './../../api/api/lta.service';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZugPosComponent implements OnInit {
  constructor(
    private ltaService: LtaService,
    private cdr: ChangeDetectorRef
  ) { }

  public zugPos: { [key: string ]: ZugPos} = {};

  numberOfTicks = 0;
  // public zugPosList: ZugPos[] = [];

  ngOnInit(): void {
    this.ltaService.znv() //
      .pipe(
        filter(znt => znt.typ === 'ORT'),
        filter(znt => Boolean(znt.bisZugIdentifikation.zugnummer)),
        bufferTime(100)
      )
      .subscribe(znts => {
        console.log(znts);

        const zugPosCopy = Object.assign({}, this.zugPos);
        for (const zn of znts) {
          this.zugPos[zn.bisZugIdentifikation.zugnummer] = {
            zug: zn.bisZugIdentifikation.zugnummer,
            station: zn.bisStation,
            gleis: zn.bisGleisName
          };
        }

        // this.zugPos = zugPosCopy;
        this.cdr.detectChanges();
        this.cdr.markForCheck();

        // this.zugPosList = Object.values(this.zugPos);
      });
  }
}

interface ZugPos {
  zug: string;
  station: string;
  gleis: string;
}
