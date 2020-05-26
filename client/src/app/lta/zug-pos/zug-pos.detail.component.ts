import { MatTableDataSource } from '@angular/material/table';
import { ZugPosDb } from './zug-pos-db.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-zug-pos-detail',
  templateUrl: './zug-pos.detail.component.html',
  styleUrls: ['./zug-pos.detail.component.css']
})
export class ZugPosDetailComponent implements OnChanges {
  displayedColumns: string[] = ['station', 'gleis', 'time'];
  dataSource = new MatTableDataSource();

  @Input()
  public zugNummer = '';

  constructor(
    private zugPosDb: ZugPosDb,
  ) {
  }

  ngOnChanges(): void {
    this.zugPosDb.getZugHistory(this.zugNummer).then(zugPos => {
      this.dataSource.data = zugPos;
    });
  }

}
