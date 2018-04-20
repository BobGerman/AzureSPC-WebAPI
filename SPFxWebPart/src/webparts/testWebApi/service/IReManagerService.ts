import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IReProperty } from '../model/IReProperty';

export interface IReManagerService {
    getReProperties(context: IWebPartContext,
                    serviceScope: ServiceScope,
                    clientId: string,
                    endpointUrl: string):
        Promise<IReProperty[] | string>;
}
