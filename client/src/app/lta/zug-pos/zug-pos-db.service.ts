import { Injectable } from '@angular/core';
declare var openDatabase: any;

@Injectable()
export class ZugPosDb {
  private db: any;

  constructor() {
    this.db = openDatabase('lta_zug', '1.2', 'Train Positions', 2 * 1024 * 1024);
    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS position (' +
        'zug TEXT, ' +
        'station TEXT, ' +
        'gleis TEXT, ' +
        'time INTEGER)'
      );
    });

    this.db.changeVersion('1.0', '1.1', tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS position (' +
        'zug TEXT, ' +
        'gleis TEXT, ' +
        'time INTEGER)'
      );
    });
    this.db.changeVersion('1.1', '1.2', tx => {
      tx.executeSql(
        'ALTER TABLE position ' +
        'ADD COLUMN station TEXT'
      );
    });
  }

  public saveZugPos(zugPositions: ZugPos[]): void {
    const now = new Date();
    this.db.transaction(tx => {
      for (const zugPosition of zugPositions) {
        tx.executeSql(
          'INSERT INTO position (zug, station, gleis, time) VALUES (?, ?, ?, ?)',
          [zugPosition.zug, zugPosition.station, zugPosition.gleis, now.getTime()]
        );
      }
    });
  }

  public getLatesPosPerZug(): Promise<ZugPos[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql('SELECT ' +
          '  p.zug, ' +
          '  p.station, ' +
          '  p.gleis, ' +
          '  p.time ' +
          'FROM position p ' +
          'LEFT OUTER JOIN position o ON (p.zug = o.zug ' +
          ' AND p.time < o.time)' +
          'WHERE o.zug IS NULL',
          [], (_, dbResults) => {
            const res = [];
            for (const row of dbResults.rows) {
              // cast SQLResultSetRowList to array
              res.push(row);
            }
            resolve(res);
          }, (_, err) => reject(err));
      });
    });
  }
}

export interface ZugPos {
  zug: string;
  station: string;
  gleis: string;
}
