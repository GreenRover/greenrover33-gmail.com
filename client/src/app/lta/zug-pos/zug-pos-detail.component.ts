import { Component, Inject, Input, OnChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ZugPosDb } from './zug-pos.db.service';

@Component({
  selector: 'app-zug-pos-detail',
  templateUrl: './zug-pos-detail.component.html',
  styleUrls: ['./zug-pos-detail.component.css']
})
export class ZugPosDetailsComponent implements OnChanges {
  @Input() zugNr = '';

  displayedColumns: string[] = ['zug', 'station', 'gleis', 'time'];
  dataSource = new MatTableDataSource();

  constructor(
    private zugPosDb: ZugPosDb,
  ) {
  }

  ngOnChanges(): void {
    this.zugPosDb.getZugHistory(this.zugNr).then(zugPos => {
      this.dataSource.data = zugPos;
    });
  }
}

@Component({
  selector: 'app-zug-pos-detail-dialog',
  templateUrl: './zug-pos-detail.component.html',
  styleUrls: ['./zug-pos-detail.component.css']
})
export class ZugPosDetailsDialogComponent extends ZugPosDetailsComponent{
  constructor(
    zugPosDb: ZugPosDb,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    super(zugPosDb);

    if (data && data.zugNr) {
      this.zugNr = data.zugNr;
      this.ngOnChanges();
    }
  }
}
