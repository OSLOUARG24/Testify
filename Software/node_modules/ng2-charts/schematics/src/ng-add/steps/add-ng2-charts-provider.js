"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChartsProviderToMain = void 0;
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const messages = tslib_1.__importStar(require("../messages"));
const schematics_2 = require("@angular/cdk/schematics");
const utility_1 = require("@schematics/angular/utility");
const PACKAGE_NAME = 'ng2-charts';
/**
 * Patches `app.config.ts` by adding our provider
 */
function addChartsProviderToMain(options) {
    return async (host) => {
        const workspace = await (0, workspace_1.getWorkspace)(host);
        const projectName = options.project || workspace.extensions['defaultProject'];
        const project = (0, schematics_2.getProjectFromWorkspace)(workspace, options.project);
        if (!project) {
            throw new schematics_1.SchematicsException(messages.noProject(projectName));
        }
        return (0, utility_1.addRootProvider)(projectName, ({ code, external }) => {
            return code `${external('provideCharts', PACKAGE_NAME)}(${external('withDefaultRegisterables', PACKAGE_NAME)}())`;
        });
    };
}
exports.addChartsProviderToMain = addChartsProviderToMain;
//# sourceMappingURL=add-ng2-charts-provider.js.map