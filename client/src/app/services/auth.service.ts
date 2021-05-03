import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserInfo } from 'angular-oauth2-oidc/types';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  picture: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authenticated$ = new Subject<string>();
  private user$ = new Subject<User>();

  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(environment.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        if (
          this.oauthService.hasValidIdToken() &&
          this.oauthService.hasValidAccessToken()
        ) {
          console.log('user has valid token');
          this.authenticated$.next(this.accessToken);
          this.user$.next(this.oauthService.getIdentityClaims() as User);
        }
      });
  }

  public getUser$(): Observable<User> {
    return this.user$;
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  // Optional. Can be removed, if the user user is forcefully logged in as defined above.
  public logOut(): void {
    // With providing true to .logOut, the app does not redirect after logging out.
    this.oauthService.logOut(true);
  }

  public login(): void {
    this.oauthService.initLoginFlow(this.router.url);
  }

  public loadUserProfile(): Promise<UserInfo> {
    return this.oauthService.loadUserProfile();
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  /**
   * Get access token when available
   */
  public whenAuthenticated(): Observable<string> {
    return this.authenticated$.pipe(
      shareReplay(1),
    );
  }
}
