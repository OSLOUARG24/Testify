import { ModuleWithProviders } from '@angular/core';
import { OAuthModuleConfig } from './oauth-module.config';
import { NullValidationHandler } from './token-validation/null-validation-handler';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class OAuthModule {
    static forRoot(config?: OAuthModuleConfig, validationHandlerClass?: typeof NullValidationHandler): ModuleWithProviders<OAuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OAuthModule, never, [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OAuthModule>;
}
