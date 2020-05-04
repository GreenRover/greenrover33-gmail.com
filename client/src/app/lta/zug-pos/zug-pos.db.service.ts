import { Injectable } from '@angular/core';
declare var openDatabase: any;

@Injectable()
export class ZugPosDb {
  private db;

  constructor(
  ) {
    this.db = openDatabase('lta_zug', '1.0', 'Train Positions', 2 * 1024 * 1024);
    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS position (' +
        'zug TEXT, ' +
        'station TEXT, ' +
        'gleis TEXT, ' +
        'time INTEGER)',
        [], () => { }, null
      );
    });
  }

  public writeZugPos(zugPos: ZugPos[]) {
    const now = new Date();
    this.db.transaction((tx) => {
      for (const zPos of zugPos) {
        tx.executeSql(
          'INSERT INTO position (zug, station, gleis, time) VALUES (?,?,?,?)',
          [zPos.zug, zPos.station, zPos.gleis, now.getTime()]);
      }
    });
  }

  public getLatesPosPerZug(): Promise<ZugPos[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ' +
          '  p.zug, ' +
          '  p.station, ' +
          '  p.gleis, ' +
          '  p.time ' +
          'FROM position p ' +
          'LEFT OUTER JOIN position o ON (p.zug = o.zug ' +
          ' AND p.time < o.time)' +
          'WHERE o.zug IS NULL',
          [], (_, zugPos) => {
            const res = [];
            for (const row of zugPos.rows) {
              res.push(row);
            }

            resolve(res);
          }, err => reject(err));
      });
    });
  }

  public getZugHistory(zug: string): Promise<ZugPos[]> {
    console.log('getZugHistory', zug);

    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('SELECT ' +
          '  p.zug, ' +
          '  p.station, ' +
          '  p.gleis, ' +
          '  p.time ' +
          'FROM position p ' +
          'WHERE p.zug = ? ' +
          'ORDER BY p.time DESC',
          [zug], (_, zugPos) => {
            const res = [];
            for (const row of zugPos.rows) {
              res.push(row);
            }

            resolve(res);
          }, err => reject(err));
      });
    });
  }
}

export interface ZugPos {
  zug: string;
  station: string;
  gleis: string;
}
