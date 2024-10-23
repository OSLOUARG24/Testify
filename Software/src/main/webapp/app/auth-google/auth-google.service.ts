import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGoogleService {

private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

constructor(
    protected router: Router,
    protected oAuthService: OAuthService

  ) {this.initConfiguration();}


  initConfiguration(){
    this.oAuthService.issuer= "https://accounts.google.com";
    this.oAuthService.strictDiscoveryDocumentValidation= false;
    this.oAuthService.clientId= "593984965302-svn4fkgq9l1iuhf41fabde2beb96bdrg.apps.googleusercontent.com";
    this.oAuthService.redirectUri= window.location.origin + '/dashboard';
    this.oAuthService.scope= "openid profile email";
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        if (this.oAuthService.hasValidAccessToken()) {
          this.isAuthenticatedSubject.next(true);
        } else {
          this.isAuthenticatedSubject.next(false);
        }
      });
    this.oAuthService.setStorage(sessionStorage);
  }

  login(){
    this.oAuthService.initImplicitFlow();
  }

  logOut(){
    sessionStorage.removeItem('project');
    sessionStorage.removeItem('userRoles');
    sessionStorage.removeItem('roleAssigUserId');
    localStorage.removeItem('user');
    this.oAuthService.revokeTokenAndLogout();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }

  getToken(){
    return this.oAuthService.getAccessToken();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
