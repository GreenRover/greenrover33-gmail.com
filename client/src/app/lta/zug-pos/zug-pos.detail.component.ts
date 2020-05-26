import { Component, Input, OnChanges, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ZugPosDb } from './zug-pos-db.service';

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



@Component({
  selector: 'app-zug-pos-dialog-detail',
  templateUrl: './zug-pos.detail.component.html',
  styleUrls: ['./zug-pos.detail.component.css']
})
export class ZugPosDetailDialogComponent extends ZugPosDetailComponent {
  constructor(
    zugPosDb: ZugPosDb,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    super(zugPosDb);

    if (data && data.zugNr) {
      this.zugNummer = data.zugNr;
      this.ngOnChanges();
    }
  }
}
