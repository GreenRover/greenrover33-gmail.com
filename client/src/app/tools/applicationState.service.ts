import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationStateService {
  public isMobileResolution(): boolean {
    return (window.innerWidth < 768);
  }
}
