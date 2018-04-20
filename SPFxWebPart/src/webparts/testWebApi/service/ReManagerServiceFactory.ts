import { IReManagerService } from './IReManagerService';
import MockReManagerService from './MockReManagerService';
import ReManagerService from './ReManagerService';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class ReManagerServiceFactory {

    public static getService(environmentType: EnvironmentType) : IReManagerService {

        if (environmentType === EnvironmentType.Local) {
            return new MockReManagerService();
        } else {
            return new ReManagerService();
        }
    }
}
