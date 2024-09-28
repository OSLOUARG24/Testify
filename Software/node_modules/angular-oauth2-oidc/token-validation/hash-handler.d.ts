import * as i0 from "@angular/core";
/**
 * Abstraction for crypto algorithms
 */
export declare abstract class HashHandler {
    abstract calcHash(valueToHash: string, algorithm: string): Promise<string>;
}
export declare class DefaultHashHandler implements HashHandler {
    calcHash(valueToHash: string, algorithm: string): Promise<string>;
    toHashString2(byteArray: number[]): string;
    toHashString(buffer: ArrayBuffer): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultHashHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultHashHandler>;
}
