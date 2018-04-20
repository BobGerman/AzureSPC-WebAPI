import { IWebPartContext} from '@microsoft/sp-webpart-base';
import { IReProperty } from '../model/IReProperty';

export interface IReManagerService {
    getReProperties(context: IWebPartContext,
                    clientId: string,
                    endpointUrl: string):
        Promise<IReProperty[] | string>;
}
