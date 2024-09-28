import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthResourceServerErrorHandler } from './resource-server-error-handler';
import { OAuthModuleConfig } from '../oauth-module.config';
import { OAuthService } from '../oauth-service';
import * as i0 from "@angular/core";
export declare class DefaultOAuthInterceptor implements HttpInterceptor {
    private oAuthService;
    private errorHandler;
    private moduleConfig;
    constructor(oAuthService: OAuthService, errorHandler: OAuthResourceServerErrorHandler, moduleConfig: OAuthModuleConfig);
    private checkUrl;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultOAuthInterceptor, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultOAuthInterceptor>;
}
