import * as i0 from "@angular/core";
export declare abstract class DateTimeProvider {
    abstract now(): number;
    abstract new(): Date;
}
export declare class SystemDateTimeProvider extends DateTimeProvider {
    now(): number;
    new(): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<SystemDateTimeProvider, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SystemDateTimeProvider>;
}
