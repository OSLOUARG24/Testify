import { EnvironmentProviders } from '@angular/core';
import { OAuthModuleConfig } from './oauth-module.config';
import { NullValidationHandler } from './token-validation/null-validation-handler';
export declare function provideOAuthClient(config?: OAuthModuleConfig, validationHandlerClass?: typeof NullValidationHandler): EnvironmentProviders;
