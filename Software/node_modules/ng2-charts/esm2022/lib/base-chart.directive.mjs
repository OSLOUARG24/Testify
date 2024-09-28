import { Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, } from '@angular/core';
import { Chart, defaults, } from 'chart.js';
import { ThemeService } from './theme.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'lodash-es';
import { NG_CHARTS_CONFIGURATION, } from './ng-charts.provider';
import * as i0 from "@angular/core";
import * as i1 from "./theme.service";
export class BaseChartDirective {
    constructor(element, zone, themeService, config) {
        this.zone = zone;
        this.themeService = themeService;
        this.type = 'bar';
        this.plugins = [];
        this.chartClick = new EventEmitter();
        this.chartHover = new EventEmitter();
        this.subs = [];
        this.themeOverrides = {};
        if (config?.registerables) {
            Chart.register(...config.registerables);
        }
        if (config?.defaults) {
            defaults.set(config.defaults);
        }
        this.ctx = element.nativeElement.getContext('2d');
        this.subs.push(this.themeService.colorschemesOptions
            .pipe(distinctUntilChanged())
            .subscribe((r) => this.themeChanged(r)));
    }
    ngOnChanges(changes) {
        const requireRender = ['type'];
        const propertyNames = Object.getOwnPropertyNames(changes);
        if (propertyNames.some((key) => requireRender.includes(key)) ||
            propertyNames.every((key) => changes[key].isFirstChange())) {
            this.render();
        }
        else {
            const config = this.getChartConfiguration();
            // Using assign to avoid changing the original object reference
            if (this.chart) {
                Object.assign(this.chart.config.data, config.data);
                if (this.chart.config.plugins) {
                    Object.assign(this.chart.config.plugins, config.plugins);
                }
                if (this.chart.config.options) {
                    Object.assign(this.chart.config.options, config.options);
                }
            }
            this.update();
        }
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
        this.subs.forEach((s) => s.unsubscribe());
    }
    render() {
        if (this.chart) {
            this.chart.destroy();
        }
        return this.zone.runOutsideAngular(() => (this.chart = new Chart(this.ctx, this.getChartConfiguration())));
    }
    update(mode) {
        if (this.chart) {
            this.zone.runOutsideAngular(() => this.chart?.update(mode));
        }
    }
    hideDataset(index, hidden) {
        if (this.chart) {
            this.chart.getDatasetMeta(index).hidden = hidden;
            this.update();
        }
    }
    isDatasetHidden(index) {
        return this.chart?.getDatasetMeta(index)?.hidden;
    }
    toBase64Image() {
        return this.chart?.toBase64Image();
    }
    themeChanged(options) {
        this.themeOverrides = options;
        if (this.chart) {
            if (this.chart.config.options) {
                Object.assign(this.chart.config.options, this.getChartOptions());
            }
            this.update();
        }
    }
    getChartOptions() {
        return merge({
            onHover: (event, active) => {
                if (!this.chartHover.observed && !this.chartHover.observers?.length) {
                    return;
                }
                this.zone.run(() => this.chartHover.emit({ event, active }));
            },
            onClick: (event, active) => {
                if (!this.chartClick.observed && !this.chartClick.observers?.length) {
                    return;
                }
                this.zone.run(() => this.chartClick.emit({ event, active }));
            },
        }, this.themeOverrides, this.options, {
            plugins: {
                legend: {
                    display: this.legend,
                },
            },
        });
    }
    getChartConfiguration() {
        return {
            type: this.type,
            data: this.getChartData(),
            options: this.getChartOptions(),
            plugins: this.plugins,
        };
    }
    getChartData() {
        return this.data
            ? this.data
            : {
                labels: this.labels || [],
                datasets: this.datasets || [],
            };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.7", ngImport: i0, type: BaseChartDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.ThemeService }, { token: NG_CHARTS_CONFIGURATION, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.7", type: BaseChartDirective, isStandalone: true, selector: "canvas[baseChart]", inputs: { type: "type", legend: "legend", data: "data", options: "options", plugins: "plugins", labels: "labels", datasets: "datasets" }, outputs: { chartClick: "chartClick", chartHover: "chartHover" }, exportAs: ["base-chart"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.7", ngImport: i0, type: BaseChartDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'canvas[baseChart]',
                    exportAs: 'base-chart',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.ThemeService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NG_CHARTS_CONFIGURATION]
                }] }], propDecorators: { type: [{
                type: Input
            }], legend: [{
                type: Input
            }], data: [{
                type: Input
            }], options: [{
                type: Input
            }], plugins: [{
                type: Input
            }], labels: [{
                type: Input
            }], datasets: [{
                type: Input
            }], chartClick: [{
                type: Output
            }], chartHover: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jaGFydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25nMi1jaGFydHMvc3JjL2xpYi9iYXNlLWNoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsS0FBSyxFQUtMLFFBQVEsR0FHVCxNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQ0wsdUJBQXVCLEdBRXhCLE1BQU0sc0JBQXNCLENBQUM7OztBQVE5QixNQUFNLE9BQU8sa0JBQWtCO0lBd0M3QixZQUNFLE9BQW1CLEVBQ1gsSUFBWSxFQUNaLFlBQTBCLEVBQ1csTUFBOEI7UUFGbkUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBcENwQixTQUFJLEdBQ2xCLEtBQWMsQ0FBQztRQUlELFlBQU8sR0FBb0IsRUFBRSxDQUFDO1FBYTdCLGVBQVUsR0FHdEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNQLGVBQVUsR0FHdEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUtoQixTQUFJLEdBQW1CLEVBQUUsQ0FBQztRQUMxQixtQkFBYyxHQUFrQyxFQUFFLENBQUM7UUFRekQsSUFBSSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztR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QUM7SUFFTyxZQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUk7WUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDWCxDQUFDLENBQUM7Z0JBQ0UsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRTtnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTthQUM5QixDQUFDO0lBQ1IsQ0FBQzs4R0E3TFUsa0JBQWtCLDhGQTRDUCx1QkFBdUI7a0dBNUNsQyxrQkFBa0I7OzJGQUFsQixrQkFBa0I7a0JBTjlCLFNBQVM7bUJBQUM7b0JBQ1QsOERBQThEO29CQUM5RCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzswQkE2Q0ksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyx1QkFBdUI7eUNBckM3QixJQUFJO3NCQUFuQixLQUFLO2dCQUVVLE1BQU07c0JBQXJCLEtBQUs7Z0JBQ1UsSUFBSTtzQkFBbkIsS0FBSztnQkFDVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLE9BQU87c0JBQXRCLEtBQUs7Z0JBRVUsTUFBTTtzQkFBckIsS0FBSztnQkFLVSxRQUFRO3NCQUF2QixLQUFLO2dCQU1XLFVBQVU7c0JBQTFCLE1BQU07Z0JBSVUsVUFBVTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENoYXJ0LFxuICBDaGFydENvbmZpZ3VyYXRpb24sXG4gIENoYXJ0RXZlbnQsXG4gIENoYXJ0VHlwZSxcbiAgRGVmYXVsdERhdGFQb2ludCxcbiAgZGVmYXVsdHMsXG4gIFBsdWdpbixcbiAgVXBkYXRlTW9kZSxcbn0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0IHsgVGhlbWVTZXJ2aWNlIH0gZnJvbSAnLi90aGVtZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQge1xuICBOR19DSEFSVFNfQ09ORklHVVJBVElPTixcbiAgTmdDaGFydHNDb25maWd1cmF0aW9uLFxufSBmcm9tICcuL25nLWNoYXJ0cy5wcm92aWRlcic7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2NhbnZhc1tiYXNlQ2hhcnRdJyxcbiAgZXhwb3J0QXM6ICdiYXNlLWNoYXJ0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUNoYXJ0RGlyZWN0aXZlPFxuICAgIFRUeXBlIGV4dGVuZHMgQ2hhcnRUeXBlID0gQ2hhcnRUeXBlLFxuICAgIFREYXRhID0gRGVmYXVsdERhdGFQb2ludDxUVHlwZT4sXG4gICAgVExhYmVsID0gdW5rbm93bixcbiAgPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzXG57XG4gIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiBDaGFydENvbmZpZ3VyYXRpb248VFR5cGUsIFREYXRhLCBUTGFiZWw+Wyd0eXBlJ10gPVxuICAgICdiYXInIGFzIFRUeXBlO1xuICBASW5wdXQoKSBwdWJsaWMgbGVnZW5kPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIGRhdGE/OiBDaGFydENvbmZpZ3VyYXRpb248VFR5cGUsIFREYXRhLCBUTGFiZWw+WydkYXRhJ107XG4gIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBDaGFydENvbmZpZ3VyYXRpb248VFR5cGUsIFREYXRhLCBUTGFiZWw+WydvcHRpb25zJ107XG4gIEBJbnB1dCgpIHB1YmxpYyBwbHVnaW5zOiBQbHVnaW48VFR5cGU+W10gPSBbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgbGFiZWxzPzogQ2hhcnRDb25maWd1cmF0aW9uPFxuICAgIFRUeXBlLFxuICAgIFREYXRhLFxuICAgIFRMYWJlbFxuICA+WydkYXRhJ11bJ2xhYmVscyddO1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YXNldHM/OiBDaGFydENvbmZpZ3VyYXRpb248XG4gICAgVFR5cGUsXG4gICAgVERhdGEsXG4gICAgVExhYmVsXG4gID5bJ2RhdGEnXVsnZGF0YXNldHMnXTtcblxuICBAT3V0cHV0KCkgcHVibGljIGNoYXJ0Q2xpY2s6IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ/OiBDaGFydEV2ZW50O1xuICAgIGFjdGl2ZT86IG9iamVjdFtdO1xuICB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjaGFydEhvdmVyOiBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDaGFydEV2ZW50O1xuICAgIGFjdGl2ZTogb2JqZWN0W107XG4gIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjdHg6IHN0cmluZztcbiAgcHVibGljIGNoYXJ0PzogQ2hhcnQ8VFR5cGUsIFREYXRhLCBUTGFiZWw+O1xuXG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSB0aGVtZU92ZXJyaWRlczogQ2hhcnRDb25maWd1cmF0aW9uWydvcHRpb25zJ10gPSB7fTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHRoZW1lU2VydmljZTogVGhlbWVTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfQ0hBUlRTX0NPTkZJR1VSQVRJT04pIGNvbmZpZz86IE5nQ2hhcnRzQ29uZmlndXJhdGlvbixcbiAgKSB7XG4gICAgaWYgKGNvbmZpZz8ucmVnaXN0ZXJhYmxlcykge1xuICAgICAgQ2hhcnQucmVnaXN0ZXIoLi4uY29uZmlnLnJlZ2lzdGVyYWJsZXMpO1xuICAgIH1cblxuICAgIGlmIChjb25maWc/LmRlZmF1bHRzKSB7XG4gICAgICBkZWZhdWx0cy5zZXQoY29uZmlnLmRlZmF1bHRzKTtcbiAgICB9XG5cbiAgICB0aGlzLmN0eCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuc3Vicy5wdXNoKFxuICAgICAgdGhpcy50aGVtZVNlcnZpY2UuY29sb3JzY2hlbWVzT3B0aW9uc1xuICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAuc3Vic2NyaWJlKChyKSA9PiB0aGlzLnRoZW1lQ2hhbmdlZChyKSksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCByZXF1aXJlUmVuZGVyID0gWyd0eXBlJ107XG4gICAgY29uc3QgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNoYW5nZXMpO1xuXG4gICAgaWYgKFxuICAgICAgcHJvcGVydHlOYW1lcy5zb21lKChrZXkpID0+IHJlcXVpcmVSZW5kZXIuaW5jbHVkZXMoa2V5KSkgfHxcbiAgICAgIHByb3BlcnR5TmFtZXMuZXZlcnkoKGtleSkgPT4gY2hhbmdlc1trZXldLmlzRmlyc3RDaGFuZ2UoKSlcbiAgICApIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0Q2hhcnRDb25maWd1cmF0aW9uKCk7XG5cbiAgICAgIC8vIFVzaW5nIGFzc2lnbiB0byBhdm9pZCBjaGFuZ2luZyB0aGUgb3JpZ2luYWwgb2JqZWN0IHJlZmVyZW5jZVxuICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNoYXJ0LmNvbmZpZy5kYXRhLCBjb25maWcuZGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0LmNvbmZpZy5wbHVnaW5zKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNoYXJ0LmNvbmZpZy5wbHVnaW5zLCBjb25maWcucGx1Z2lucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hhcnQuY29uZmlnLm9wdGlvbnMpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY2hhcnQuY29uZmlnLm9wdGlvbnMsIGNvbmZpZy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XG4gICAgICB0aGlzLmNoYXJ0ID0gdm9pZCAwO1xuICAgIH1cbiAgICB0aGlzLnN1YnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogQ2hhcnQ8VFR5cGUsIFREYXRhLCBUTGFiZWw+IHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcihcbiAgICAgICgpID0+ICh0aGlzLmNoYXJ0ID0gbmV3IENoYXJ0KHRoaXMuY3R4LCB0aGlzLmdldENoYXJ0Q29uZmlndXJhdGlvbigpKSksXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUobW9kZT86IFVwZGF0ZU1vZGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuY2hhcnQ/LnVwZGF0ZShtb2RlKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhpZGVEYXRhc2V0KGluZGV4OiBudW1iZXIsIGhpZGRlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLmNoYXJ0LmdldERhdGFzZXRNZXRhKGluZGV4KS5oaWRkZW4gPSBoaWRkZW47XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGFzZXRIaWRkZW4oaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmNoYXJ0Py5nZXREYXRhc2V0TWV0YShpbmRleCk/LmhpZGRlbjtcbiAgfVxuXG4gIHB1YmxpYyB0b0Jhc2U2NEltYWdlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY2hhcnQ/LnRvQmFzZTY0SW1hZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgdGhlbWVDaGFuZ2VkKG9wdGlvbnM6IENoYXJ0Q29uZmlndXJhdGlvblsnb3B0aW9ucyddKTogdm9pZCB7XG4gICAgdGhpcy50aGVtZU92ZXJyaWRlcyA9IG9wdGlvbnM7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIGlmICh0aGlzLmNoYXJ0LmNvbmZpZy5vcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jaGFydC5jb25maWcub3B0aW9ucywgdGhpcy5nZXRDaGFydE9wdGlvbnMoKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDaGFydE9wdGlvbnMoKTogQ2hhcnRDb25maWd1cmF0aW9uPFxuICAgIFRUeXBlLFxuICAgIFREYXRhLFxuICAgIFRMYWJlbFxuICA+WydvcHRpb25zJ10ge1xuICAgIHJldHVybiBtZXJnZShcbiAgICAgIHtcbiAgICAgICAgb25Ib3ZlcjogKGV2ZW50OiBDaGFydEV2ZW50LCBhY3RpdmU6IG9iamVjdFtdKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmNoYXJ0SG92ZXIub2JzZXJ2ZWQgJiYgIXRoaXMuY2hhcnRIb3Zlci5vYnNlcnZlcnM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5jaGFydEhvdmVyLmVtaXQoeyBldmVudCwgYWN0aXZlIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljazogKGV2ZW50PzogQ2hhcnRFdmVudCwgYWN0aXZlPzogb2JqZWN0W10pID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuY2hhcnRDbGljay5vYnNlcnZlZCAmJiAhdGhpcy5jaGFydENsaWNrLm9ic2VydmVycz8ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLmNoYXJ0Q2xpY2suZW1pdCh7IGV2ZW50LCBhY3RpdmUgfSkpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRoaXMudGhlbWVPdmVycmlkZXMsXG4gICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICB7XG4gICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IHRoaXMubGVnZW5kLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldENoYXJ0Q29uZmlndXJhdGlvbigpOiBDaGFydENvbmZpZ3VyYXRpb248VFR5cGUsIFREYXRhLCBUTGFiZWw+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgZGF0YTogdGhpcy5nZXRDaGFydERhdGEoKSxcbiAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0Q2hhcnRPcHRpb25zKCksXG4gICAgICBwbHVnaW5zOiB0aGlzLnBsdWdpbnMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2hhcnREYXRhKCk6IENoYXJ0Q29uZmlndXJhdGlvbjxUVHlwZSwgVERhdGEsIFRMYWJlbD5bJ2RhdGEnXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVxuICAgICAgPyB0aGlzLmRhdGFcbiAgICAgIDoge1xuICAgICAgICAgIGxhYmVsczogdGhpcy5sYWJlbHMgfHwgW10sXG4gICAgICAgICAgZGF0YXNldHM6IHRoaXMuZGF0YXNldHMgfHwgW10sXG4gICAgICAgIH07XG4gIH1cbn1cbiJdfQ==