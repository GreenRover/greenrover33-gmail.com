import { TzdeMessage } from './../model/tzdeMessage';
import { ElzMessage } from './../model/elzMessage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZnvMessage } from './../model/znvMessage';
import { SolaceSession } from './Solace.session';

// https://code.sbb.ch/projects/PT_RCS/repos/rcs/compare/diff?sourceBranch=refs%2Fheads%2Fprivate%2Fpingu%2Flta-tms-doku&targetRepoId=2626#ch.sbb.lta.tms.transfer/documentation/spec.yaml

@Injectable()
export class LtaService {

  private stage = 'int';

  constructor(
    protected solSession: SolaceSession
  ) { }


  public subscribeZnv(): Observable<ZnvMessage> {
    return this.solSession.subcribeTopic('tms/iad/operatingstate/' + this.stage + '/v1/znv/>').pipe( //
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  public subscribeTzde(): Observable<TzdeMessage> {
    return this.solSession.subcribeTopic('tms/iad/operatingstate/' + this.stage + '/v1/tzde/>').pipe( //
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  public subscribeElz(): Observable<ElzMessage> {
    return this.solSession.subcribeTopic('tms/iad/operatingstate/' + this.stage + '/v1/elz/>').pipe( //
      map(res => {
        return JSON.parse(res);
      })
    );
  }
}
